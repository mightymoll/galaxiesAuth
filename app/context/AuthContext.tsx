import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import * as Securestore from 'expo-secure-store';

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

	const value = {};

	return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>;
};