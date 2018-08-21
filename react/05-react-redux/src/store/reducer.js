const defaultItem = {
	value:'hello!!!',
	list:['aaa!!','bbb!!']
};
import { CHANGE,ADD,DELETE,LOADATE } from './actionType.js';
export default (state=defaultItem,action)=>{
	if (action.type == CHANGE) {
		const newState = JSON.parse(JSON.stringify(state));
		newState.value = action.payload;
		return newState;
	}
	if (action.type == LOADATE) {
		const newState = JSON.parse(JSON.stringify(state));
		newState.list = action.payload;
		return newState;
	}
	if (action.type == ADD) {
		const newState = JSON.parse(JSON.stringify(state));
		newState.list.push(newState.value);
		newState.value = '';
		return newState;
	}
	if (action.type == DELETE) {
		const newState = JSON.parse(JSON.stringify(state));
		newState.list.splice(action.payload,1);
		return newState;
	}
	return state;
};