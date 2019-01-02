import React from "react";
import { render } from "react-dom";
import '../../css/main.css';
import Table from './presentational/Table';
import { connect } from 'react-redux';

class Page2 extends React.Component {
	constructor(props){
		super(props);
	}

	render() {	  
		return ( 
			<div>
			<Table schemaName="Task" data={this.props.Task}/>
			<hr/>
			<Table schemaName="Note" data={this.props.Note}/>
			</div>
		)
	}
}
function mapStateToProps (state) {
	return {
		  Task: state.Task,
		  Note: state.Note
    };
}
function mapDispatchToProps (_dispatch) {
	return {
			dispatch : _dispatch
    }
 }
 export default connect(mapStateToProps, mapDispatchToProps)(Page2);