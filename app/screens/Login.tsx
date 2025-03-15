import { View, Text } from 'react-native';
import React, {useState} from 'react';
import {useAuth} from '../context/AuthContext'

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const {onLogin, onRegister} = useAuth();

// alert if login is not successful
	const login = async ()=>{
		const result = await onLogin!(email,password);
		if(result && result.error){
			alert(result.msg);
		}
	}

// automatically call login after a successful registration
	const register = async()=>{
		const result = await onRegister!(email, password);
    if(result && result.error){
      alert(result.msg);
    }
    else{
      login();
    }
	}

	return (
		<View>
			<Text>Login</Text>
		</View>
	)
}

export default Login