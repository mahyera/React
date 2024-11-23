import {useContext, useEffect} from 'react';
import { Navigate } from 'react-router-dom';

import UserContext from '../context/UserContext';
export default function Logout(){

const {setUser, unsetUser} = useContext(UserContext);
	//Clear the local storage
	unsetUser();
	//localStorage.clear();

	useEffect(()=>{
		setUser({
			id: null,
			isAdmin:null
		})
	})

	return(
		<Navigate to ='/login'/>
	)

}