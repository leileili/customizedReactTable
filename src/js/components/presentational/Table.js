import React from "react";
import { render } from "react-dom";
import '../../../css/main.css';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import PopupWindow from './PopupWindow';
import '../../../css/table.css';
import db from "../../DB/DB";
import Schema from '../../comm/Schema';
import { connect } from 'react-redux';

class Table extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPopup: false,
			popupWindowType: undefined,
			rowIndex: -1,
		}
		this.schema = Schema[this.props.schemaName];
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
	}

	togglePopup() {
		this.setState({
		  showPopup: !this.state.showPopup
		});
	}

	handleEdit(e, rowSelected, rowContent) {
		this.togglePopup();
		this.setState({
			rowIndex: rowSelected,
			popupWindowType: 'edit'
		});
		this.selectedRowContent = rowContent;
	}

	handleDelete(e, rowSelected, rowContent) {
		this.togglePopup();
		this.setState({
			rowIndex: rowSelected,
			popupWindowType: 'delete'
		});
		this.selectedRowContent = rowContent;
	}

	handleCreate(e) {
		this.togglePopup();
		this.setState({
			popupWindowType: 'create'
		});
	}

	handleSearch(e) {
		e.preventDefault();
		this.searchText = e.target.value;
		this.refresh();
	}

	filter( searchValue="", searchContent) {
		if (searchValue==="") {
			return searchContent;
		}
		var res = [];
		for(var i=0; i<searchContent.length;i++){
			var row = searchContent[i];
			var joinedRow = Object.values(row).join().toLowerCase();
			if( joinedRow.indexOf(searchValue.toLowerCase()) > -1){
				res.push(row);
			}
		}
		return res;
	}

	//may be used for forcing render after data loaded
	refresh() {
		this.setState(Object.assign(this.state, {refresh:this.state.refresh===true?false:true}));
	}

	render() {
		var self = this;
		if (this.props.data===undefined) {
			this.props.dispatch({"type":"Dirty", "key":this.props.schemaName, "dispatch":this.props.dispatch});
		}
		
		var taskFields = this.schema.fields;
		var columns = [];
		for(var i=0; i<taskFields.length;i++){
			let item = taskFields[i]
			var singleColumn = {};
			singleColumn.Header = item.label;
			singleColumn.accessor = item.name;
			singleColumn.width = item.width;
			switch (item.tableType) {
				case "text":
					singleColumn.Cell = props => <span>{props.value}</span>;
					break;
				default:
					break;
			}
			if (item.cellRenderer!==undefined) {
				singleColumn.Cell = function(row) {
					return item.cellRenderer.call(self, row);
				}
			}
			
			if(i===taskFields.length-1){
				singleColumn.Cell = (row) => (<div style={{"display":"flex","justifyContent":"space-around"}}>
					<button onClick={(e) => this.handleEdit(e,row.index+1,row.original)}>Edit</button>
					<button onClick={(e) => this.handleDelete(e,row.index+1,row.original)}>Delete</button>
					</div>
				)
			}
			columns.push(singleColumn);
		}
		var tableData = this.filter(this.searchText, this.props.data);
		
		return (
			<div>
				<button className="add-new-row" onClick={(e) => this.handleCreate(e)}>Add new item</button>
				<span className="search">Search: <input onChange={(e) => this.handleSearch(e)}></input></span>
				<ReactTable 
					data={tableData} 
					columns={columns}
					defaultPageSize={10}
					filterable
					defaultFilterMethod={(filter, row) => {
						if( typeof row[filter.id] === "number" ){
							return row[filter.id].toString().includes(filter.value);
						} else {
							return row[filter.id].includes(filter.value);
						}}
					}
					noDataText="No Data Available!"
					className="-striped -highlight"
					SubComponent={row => {
						return (
						<div style={{ padding: "20px" }}>
							<em>
							You can put any component you want here, even another React
							Table!
							</em>
							<br />
							<br />
							<ReactTable
							data={tableData}
							columns={columns}
							defaultPageSize={3}
							showPagination={false}
							SubComponent={row => {
								return (
								<div style={{ padding: "20px" }}>
									Another Sub Component!
								</div>
								);
							}}
							/>
						</div>
						);
					}}
				/>			
				{this.state.showPopup ? 
					<PopupWindow
						update_text = "Update"
						cancel_text = "Cancel"
						delete_text = "Delete"
						add_text = "Add"
						title = 'Item'
						schemaName = {this.props.schemaName}
						type = {this.state.popupWindowType}
						idx = {this.state.rowIndex}
						columns = {columns}
						data = {this.selectedRowContent}
						closePopup = {this.togglePopup}
					/>
					: null
				}
			</div>
		)
  	}
}

function mapDispatchToProps (dispatch) {
	return {
			dispatch : dispatch
    }
}
export default connect(null, mapDispatchToProps)(Table);
