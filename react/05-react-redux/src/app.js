import React,{ Component } from 'react';

import { Input,Button,Row,Col,List } from 'antd';

//引入css
import './style.css';
import { connect } from 'react-redux';
import { changeAction,addAction,deleteAction,getInitData } from './actions.js';



class App extends Component{
	componentDidMount(){
		this.props.getData();
	}
	render(){
		//return 只能返回一个
		return(
			<div className="App">
		    <Row>
		      <Col span={18} >
			      <Input 
			      	value= {this.props.value} 
			      	onChange = {this.props.handleChange}
			      /> 
		      </Col>
		      <Col span={6} >
		      	<Button type="primary"
		      		onClick = {this.props.handleAdd}
		      	>
		      		增加
		      	</Button>
		      </Col>
		    </Row>
		    <List
		      style={{ marginTop: 10 }}
		      bordered
		      dataSource = {this.props.list}
		      renderItem={(item,index)=>
		      	(<List.Item
		      		onClick ={()=> {this.props.handleDelete(index)}}
		      		>
			      	 {item}
		      	 </List.Item>)
		      } 
		      	
		    />			    			
		</div>
		)
	}
}

const myStateToProps = (state)=>{
	// console.log(state);
	return {
		value:state.value,
		list:state.list
	}

}

const mapMethodToProps = (dispatch)=>{
	return {
		handleChange:(e)=>{
			const action = changeAction(e.target.value);
			dispatch(action);
		},
		handleDelete:(index)=>{
			const action = deleteAction(index);
			dispatch(action);
		},
		handleAdd:()=>{
			const action = addAction();
			dispatch(action);
		},
		getData:()=>{
			const action = getInitData();
			dispatch(action);
		}
	}
}

export default connect(myStateToProps, mapMethodToProps)(App);