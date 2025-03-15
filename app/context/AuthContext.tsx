import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
	authState?: {token:string |null; authenticated: boolean | null};
	onRegister?: (email: string, password: string) => Promise<any>;
	onLogin?: (email: string, password: string) => Promise<any>;
	onLogout?: () => Promise<any>;
}

// auth token - using jwt
const TOKEN_KEY = 'my-jwt';
// placeholder API for testing
export const API_URL = 'https://api.developbetterapps.com';
const AuthContext = createContext<AuthProps>({});

export const useAuth = ()=> {
	return useContext(AuthContext);
}

// return object wrapping all of the children
export const AuthProvider = ({children}:any) => {

// define state for auth status
const [authState, setAuthState] = useState<{
	token: string | null;
	authenticated: boolean | null;
}>({//default values
	token: null,
	authenticated:null,
});

// register user : async post user email and password to API/users
const register = async (email:string, password:string)=>{
	try{
		return await axios.post(`${API_URL}/users`, {email,password});
	}
	catch(e){
		return{error: true, msg: (e as any).response.data.msg};
	}
};

// login user : async post to auth path in API
const login = async (email:string, password:string)=>{
	try{
		const result = await axios.post(`${API_URL}/auth`, {email,password});

		console.log("file:AuthContext.tsx:41 login result:", result)

		setAuthState({
			token: result.data.token,
			authenticated: true,
		});

	// attach token to all future API requests (stored in Expo SecureStore)
	axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

	await SecureStore.setItemAsync(TOKEN_KEY, result.data.token)
	return result;

	}
	catch(e){
		return{error: true, msg: (e as any).response.data.msg};
	}
};

// logout user by deleting token from Expo storage and resetting http headers
const logout = async()=>{
	// delete token from Expo storage
	await SecureStore.deleteItemAsync(TOKEN_KEY);

	// update HTTP headers to <null>
	axios.defaults.headers.common['Authorization'] = '';

  // reset auth state
  setAuthState({
    token: null,
    authenticated: false,
  });
}

// auth-related props
	const value = {
		onRegister: register,
		onLogin: login,
		onLogout: logout,
    authState  // other auth-related props can be added here, like user data or error messages...
	};

	return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>;
};