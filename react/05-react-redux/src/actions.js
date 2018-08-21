import { CHANGE,ADD,DELETE,LOADATE } from './store/actionType.js';
import axios from 'axios';

export const changeAction = (payload)=>{
	return {
			type:CHANGE,
			payload
		};
};
export const addAction = ()=>{
	return {
			type:ADD
		};
};
export const deleteAction = (payload)=>{
	return {
			type:DELETE,
			payload
		};
};
export const loadateAction = (payload)=>{
	return {
			type:LOADATE,
			payload
		};
};
export const getInitData = ()=>{
	return (dispatch)=>{
		axios
		.get('http://127.0.0.1:3000')
		.then((data)=>{
			const action = loadateAction(data.data);
			dispatch(action);
		})
		.catch((e)=>{
			console.log('err:::',e);
		});
	};
	
};