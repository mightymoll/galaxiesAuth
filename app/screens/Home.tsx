import { View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL} from '../context/AuthContext'

const Home = () => {

const [users, setUsers] = useState<any[]>([]);

		useEffect(()=>{
			const loadUser = async () => {
				
				try{
					// make a call to protected endpoint
					const result = await axios.get(`${API_URL}/users`);
					setUsers(result.data);
				}catch(e:any){
					alert(e.message);
				}
			};
			loadUser();
		},[]);

	return (
		<View style={styles.container}>
					<Text style={styles.title}>Home - User List</Text>
		<ScrollView>
			{users.map((user) =>(
				<Text key={user._id}>{user.email}</Text>
			))}
		</ScrollView>
		</View>
	)
}

const styles= StyleSheet.create({
	title:{
		fontWeight: '500',
		fontSize: 24,
    textAlign: 'center',
		},
	container:{
		marginTop: 30,
		alignItems: 'center',
		width: '100%',
		gap: 30,
	},
})

export default Home