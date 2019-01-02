import React from "react";
import { render } from "react-dom";
import { connect } from 'react-redux';
import '../../css/page.css';
import '../../css/main.css';
import Table from './presentational/Table';

class Page1 extends React.Component {
	constructor(props) {
  	super(props)
  }

	render() {	  
		return ( 
			<div>
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
 export default connect(mapStateToProps, mapDispatchToProps)(Page1);