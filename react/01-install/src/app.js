import React,{Component,Fragment} from 'react';

//定义组件
//必须继承React.Component
class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			value:'',
			list:['aaa','bbb']
		};
	}
	handleEnter(e){
		if (e.target.value.length >1) {
			this.setState({
				value:e.target.value
			});
		}
		
	}
	handleAdd(e){
		this.setState({
			list:[...this.state.list,this.state.value],
			value:''
		});
	}

	//必须有一个render方法
	render(){
		//只能返回一个标签
		return(
			<div>
				<input value = {this.state.value} onChange = { this.handleEnter.bind(this) } />
				<button onClick = {this.handleAdd.bind(this)}>新增</button>
				<ul>
					{
						this.state.list.map((index,value) => {
							return (<li key={value}>{index}</li>);
						})
					}
				</ul>
			</div>
		)
	}
}

export default App;