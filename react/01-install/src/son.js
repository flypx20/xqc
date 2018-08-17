import React, { Component } from 'react';
 
class app extends Component{
	constructor(props){
		super(props);
		this.handleDelete=this.handleDelete.bind(this);
		this.content = this.props.content;
	}

	handleDelete(){
		const {handleDelete,index}=this.props;
		handleDelete(index);
	}
	render(){
		return (<li onClick = {this.handleDelete}>{this.content}</li>)
	}
}
export default app;