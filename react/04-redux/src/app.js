import React,{ Component } from 'react';

import { Input,Button,Row,Col,List } from 'antd';

//引入css
import './style.css';
import store from './store';
import { changeAction,addAction,deleteAction,loadateAction,getInitData } from './actions.js';
import UI from './ui.js';
import axios from 'axios';




class App extends Component{
	constructor(props){
		super(props);
		this.state = store.getState();

		store.subscribe(()=>{
			this.setState(store.getState());
		});
		this.handleChange = this.handleChange.bind(this);
		this.handleAdd    = this.handleAdd.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}
	componentDidMount(){
		//发送ajax请求
		/*axios
		.get('http://127.0.0.1:3000')
		.then((data)=>{
			const action = loadateAction(data.data);
			store.dispatch(action);
		})
		.catch((e)=>{
			console.log('err:::',e);
		});*/
		const action = getInitData();
		store.dispatch(action);
	}
	handleChange(e){
		/*const action = {
			type:CHANGE,
			payload:e.target.value
		};*/
		const action = changeAction(e.target.value);
		store.dispatch(action);
	}
	handleAdd(){
		/*const action = {
			type:ADD,
		};*/
		const action = addAction();
		store.dispatch(action);
	}
	handleDelete(index){
		/*const action = {
			type:DELETE,
			payload:index
		};*/
		const action = deleteAction(index);
		store.dispatch(action);
	}
	render(){
		//return 只能返回一个
		return(
			<UI 
				value        = {this.state.value}
				handleChange = {this.handleChange}
				handleAdd    = {this.handleAdd}
				list         = {this.state.list}
				handleDelete = {this.handleDelete}
			/>
		)
	}
}
export default App;