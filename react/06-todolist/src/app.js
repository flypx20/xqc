import React,{ Component } from 'react';
import TodoList from './pages/todoList/todoList.js';


//引入css
import './style.css';



class App extends Component{
	render(){
		//return 只能返回一个
		return(<div className = 'App'><TodoList /></div>)
	}
}


export default App;