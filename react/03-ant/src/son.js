import React, { Component } from 'react';
import PropTypes from 'prop-types';
 
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
		const {content}=this.props;
		return (<li onClick = {this.handleDelete}>{content}</li>)
	}
}
app.propTypes = {
	content:PropTypes.string.isRequired,
	index:PropTypes.number.isRequired,
	handleDelete:PropTypes.func
}
//设置默认父组件传值
app.defaultProps = {
	// content:''
}
export default app;