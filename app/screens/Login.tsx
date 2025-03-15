import { View, TextInput, Image, Button, StyleSheet } from 'react-native';
import React, {useState, useEffect} from 'react';
import {API_URL, useAuth} from '../context/AuthContext'
import axios from 'axios';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const {onLogin, onRegister} = useAuth();

	useEffect(()=>{
		const testCall = async () => {
			const result = await axios.get(`${API_URL}/users`);

			console.log('file: Login.tsx testCall result:', result.status)
		};
		testCall();
	}, []);

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
		<View style={styles.container}>
				<Image source={{uri:'https://static.vecteezy.com/system/resources/previews/041/731/090/non_2x/login-icon-vector.jpg'}} style={styles.image} />
			<View style={styles.form}>
				<TextInput style={styles.input} placeholder="Email" onChangeText={(text:string) =>setEmail(text)} value={email}/>
				<TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(text:string)=> setPassword(text)} value={password} />
				<Button onPress={login} title="Sign In" />
				<Button onPress={register} title="Create Account" />
			</View>
		</View>
	)
}

const styles= StyleSheet.create({
	image:{
		width:'50%',
		height: '45%',
		resizeMode: 'cover',
		overflow:'hidden',
		borderRadius: 30,
		borderColor: '#2683fd',
		borderWidth: 3,
    borderStyle:'solid',
	},
	form:{
		gap: 10,
		width: '80%',
	},
	input:{
		height: 44,
		borderWidth: 1,
		borderRadius: 4,
		padding: 10,
		backgroundColor: '#fff'
	},
	container:{
		marginTop: 30,
		alignItems: 'center',
		width: '100%',
		gap: 30,
	},
})
export default Login;