import React,{ Component } from 'react';

import { Input,Button,Row,Col,List } from 'antd';

//引入css
import './style.css';
import store from './store';




class App extends Component{
	constructor(props){
		super(props);
		this.state = store.getState();

		store.subscribe(()=>{
			this.setState(store.getState());
		});
		this.onChange = this.onChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}
	onChange(e){
		const action = {
			type:'change',
			payload:e.target.value
		};
		store.dispatch(action);
	}
	handleAdd(){
		const action = {
			type:'add',
		};
		store.dispatch(action);
	}
	handleDelete(index){
		const action = {
			type:'delete',
			payload:index
		};
		store.dispatch(action);
	}
	render(){
		//return 只能返回一个
		return(
			<div className="App">
			    <Row>
			      <Col span={18} >
				      <Input 
				      	value = {this.state.value} 
				      	onChange = {this.onChange} 
				      /> 
			      </Col>
			      <Col span={6} >
			      	<Button type="primary"
			      		onClick = {this.handleAdd}
			      	>
			      		增加
			      	</Button>
			      </Col>
			    </Row>
			    <List
			      style={{ marginTop: 10 }}
			      bordered
			      dataSource={this.state.list}
			      renderItem={(item,index) => 
			      	(<List.Item
				      	 onClick = {this.handleDelete.bind(this,index)}
				      	 >
				      	 {item}
			      	 </List.Item>)}
			    />			    			
			</div>				
		)
	}
}
export default App;