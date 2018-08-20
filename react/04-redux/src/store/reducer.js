const defaultItem = {
	value:'hello!!!',
	list:['aaa!!','bbb!!']
};

export default (state=defaultItem,action)=>{
	if (action.type == 'change') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.value = action.payload;
		return newState;
	}
	if (action.type == 'add') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.list.push(newState.value);
		newState.value = '';
		return newState;
	}
	if (action.type == 'delete') {
		const newState = JSON.parse(JSON.stringify(state));
		newState.list.splice(action.payload,1);
		return newState;
	}
	return state;
};