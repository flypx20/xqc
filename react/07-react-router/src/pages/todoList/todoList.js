import React,{ Component } from 'react';

import { Input,Button,Row,Col,List } from 'antd';

//引入css
import './todoList.css';
import { connect } from 'react-redux';
import { actionCreator } from './store/';



class todoList extends Component{
	componentDidMount(){
		this.props.getData();
	}
	render(){
		//return 只能返回一个
		return(
			<div className="todoList">
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
		value:state.get('todoList').get('value'),
		list:state.get('todoList').get('list')
	}

}

const mapMethodToProps = (dispatch)=>{
	return {
		handleChange:(e)=>{
			const action = actionCreator.changeAction(e.target.value);
			dispatch(action);
		},
		handleDelete:(index)=>{
			const action = actionCreator.deleteAction(index);
			dispatch(action);
		},
		handleAdd:()=>{
			const action = actionCreator.addAction();
			dispatch(action);
		},
		getData:()=>{
			const action = actionCreator.getInitData();
			dispatch(action);
		}
	}
}

export default connect(myStateToProps, mapMethodToProps)(todoList);