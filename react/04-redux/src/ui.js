import React,{ Component } from 'react';

import { Input,Button,Row,Col,List } from 'antd';

/*class UI extends Component{
	render(){
		return(<div className="App">
		    <Row>
		      <Col span={18} >
			      <Input 
			      	value = {this.props.value} 
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
		      dataSource={this.props.list}
		      renderItem={(item,index) => 
		      	(<List.Item
			      	 onClick = {()=>{
			      	 	this.props.handleDelete(index)
			      	 }}
			      	 >
			      	 {item}
		      	 </List.Item>)}
		    />			    			
		</div>)
		
	}
}*/

const UI = (props)=>{
	return(<div className="App">
		    <Row>
		      <Col span={18} >
			      <Input 
			      	value = {props.value} 
			      	onChange = {props.handleChange} 
			      /> 
		      </Col>
		      <Col span={6} >
		      	<Button type="primary"
		      		onClick = {props.handleAdd}
		      	>
		      		增加
		      	</Button>
		      </Col>
		    </Row>
		    <List
		      style={{ marginTop: 10 }}
		      bordered
		      dataSource={props.list}
		      renderItem={(item,index) => 
		      	(<List.Item
			      	 onClick = {()=>{
			      	 	props.handleDelete(index)
			      	 }}
			      	 >
			      	 {item}
		      	 </List.Item>)}
		    />			    			
		</div>)
};

export default UI;