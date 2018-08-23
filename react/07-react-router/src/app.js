import React,{ Component } from 'react';
import TodoList from './pages/todoList/todoList.js';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';


//引入css
import './style.css';


class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLogin:true
		};
	}
	
	render(){
		const ProtectedRoute = ({component:Component,...rest})=>(
	<Route 
		{...rest}
		render = {props=>(
				this.state.isLogin 
				?(<Component {...props} />)
				:(<Redirect to={{
					pathname:'/login'
				}} />)
			)

		}
	 />
		
)
		//return 只能返回一个
		return(<div className = 'App'>
				<Router>
				    <div>
				      <ul>
				        <li><Link to="/todolist">todolist</Link></li>
				        <li><Link to="/about">关于</Link></li>
				        <li><Link to="/about/123">关于123</Link></li>
				        <li><Link to="/about/sub">关于sub</Link></li>
				      </ul>

				      <hr/>

				      <Route path="/todolist" component={TodoList}/>
				      <ProtectedRoute path = '/about' component={about}/>
				      <Route path="/login" component={login}/>
				    </div>
				</Router>
				
				</div>)
	}
}
class about extends Component{
	render(){
		//return 只能返回一个
		return(<div className = 'App'>
					<h1>about </h1>
					<Switch>
						<Route exact path="/about" render={()=>(<p>hahah</p>)}/>
						<Route path="/about/sub" render={(route)=>(<h1>fzf</h1>)}/>
						<Route path="/about/:id" render={(route)=>(<h1>飞猪飞{route.match.params.id}</h1>)}/>
					</Switch>
				</div>)
	}
}
class login extends Component{
	render(){
		//return 只能返回一个
		return(<div className = 'App'>
					<h1>请登录 </h1>
					
				</div>)
	}
}
export default App;