import React,{Component,Fragment} from 'react';
import Son from './son';

//定义组件
//必须继承React.Component
class App extends Component{
	constructor(props){
		super(props);
	}
	//必须有一个render方法
	render(){
		//只能返回一个标签
		return(
				<LocaleProvider locale={zhCN}>
        		<div style={{ width: 400, margin: '100px auto' }}>
                          <DatePicker} />
                          <div style={{ marginTop: 20 }}>当前日期：{this.state.date && this.state.date.toString()}</div>
                        </div>
                 </LocaleProvider>
		)
	}
}

export default App;