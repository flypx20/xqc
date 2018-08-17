import React,{Component,Fragment} from 'react';
import Son from './son';

//定义组件
//必须继承React.Component
class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			value:'',
			list:['aaa','bbb']
		};
		this.handleEnter = this.handleEnter.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}
	handleEnter(e){
		const value  = e.target.value;
		this.setState((preState)=>({
			value
		}));
		
	}
	handleAdd(e){
		this.setState((preState)=>({
			list:[...preState.list,preState.value],
			value:''
		}));
	}

	handleDelete(index){

		/*const list = [...this.state.list];
		list.splice(index,1);*/
		this.setState((preState)=>{
			const list = [...this.state.list];
			list.splice(index,1);
			return {
					list
				};
		});

	}
	getSon(){
		return this.state.list.map((index,value) => {
					return (
						<Son 
							key={value} 
							content={index} 
							index = {value}
							handleDelete = {this.handleDelete} 
						/>
					);
				})
	}

	//必须有一个render方法
	render(){
		//只能返回一个标签
		return(
			<div>
				<input value = {this.state.value} onChange = { this.handleEnter } />
				<button onClick = {this.handleAdd}>新增</button>
				<ul>
					{
						this.getSon()
					}
				</ul>
			</div>
		)
	}
}

export default App;