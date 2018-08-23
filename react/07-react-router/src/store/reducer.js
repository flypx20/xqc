import { combineReducers } from 'redux-immutable';
import { reducer as todoListReducer } from '../pages/todoList/store/';


export default  combineReducers({
	todoList:todoListReducer
});