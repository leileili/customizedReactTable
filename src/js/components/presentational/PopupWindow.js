import React from "react";
import { render } from "react-dom";
import '../../../css/main.css';
import '../../../css/popup.css';
import remoteService from "../../services/RemoteService";
import Schema from '../../comm/Schema';
import { connect } from 'react-redux';

class PopupWindow extends React.Component {
    constructor(props){
        super(props);
        
        this.schema = Schema[this.props.schemaName];
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleEdit(e){
      var self = this;
      var newData = this.collectData();
      remoteService.put(this.props.schemaName, this.props.data["id"], newData , function(res) {
        self.data = res.data;
        self.props.dispatch({"type":"Dirty", "key":self.props.schemaName, "dispatch":self.props.dispatch});
        self.props.closePopup();
      })
      /*db.put(this.props.schemaName, this.props.data["id"], newData , function(res) {
        self.data = res.data;
        self.props.closePopup();
      })*/
      
    }

    handleCreate(e){
      var self = this;
      var newData = this.collectData();
      remoteService.post(this.props.schemaName, newData , function(res) {
        self.data = res.data;
        self.props.dispatch({"type":"Dirty", "key":self.props.schemaName, "dispatch":self.props.dispatch});
        self.props.closePopup();
        
      })
      /*db.post(this.props.schemaName, newData , function(res) {
        self.data = res.data;
        self.props.closePopup();
      })*/
    }

    handleDelete(e){
      var self = this;
      remoteService.delete(this.props.schemaName,function(res){
        self.status = res.status;
        self.props.dispatch({"type":"Dirty", "key":self.props.schemaName, "dispatch":self.props.dispatch});
        self.props.closePopup();
      }, this.props.data["id"]);
      /*db.delete(this.props.schemaName,function(res){
        self.status = res.status;
        self.props.closePopup();
      }, this.props.data["id"]);*/
    }

    collectData() {
      var res = {};
      for (var i=0; i<this.schema.fields.length;i++){
        var field = this.schema.fields[i]
        var f = this.refs[field.name]
        if (f===undefined) {
          continue
        }
        if (field.formType==="checkbox") {
          res[field.name] = f.checked
        } else {
          res[field.name] = f.value
        }
        
      }
      return res;
    }

    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
          {this.props.type==='edit' || this.props.type==='create' ? 
            <div>
            {this.props.type==='edit' ?
              <h1>Edit {this.props.title} {this.props.data["id"]}</h1>
            :
              <h1>Add New Item</h1>
            }
            {
              this.schema.fields.map((field, idx)=>{
                if (field.formType===undefined) {
                  return null
                }
                switch (field.formType) {
                  case "input":
                  case "hidden":
                  case "checkbox":
                    return (
                      <div key={idx} style={{"display":field.formType==="hidden"?"none":"block"}}>
                        <span className="">Update {field.label||field.name}: </span>
                        <input ref={field.name} type={field.formType} defaultValue={this.props.type==='edit' ? this.props.data[field.name] :""}/>

                      </div>)
                    break;
                  case "textarea":
                    return (
                      <div key={idx}>
                        <span>Update {field.label||field.name}: </span>
                        <div><textarea ref={field.name} rows="4" cols="50" defaultValue={this.props.type==='edit' ? this.props.data[field.name] :""} /></div>
                      </div>)
                    break;
                  case "select":
                    var options = [];
                    var list = field.options!==undefined?field.options:[]
                    for (var i=0; i<list.length; i++) {
                      var opt = list[i];
                      options.push(<option id={opt.id}>{opt.label}</option>);
                    }
                    return (
                      <div key={idx}>
                        <span>Update {field.label||field.name}: </span>
                        <select ref={field.name} type="input" defaultValue={this.props.type==='edit' ? this.props.data[field.name] : ""}>{options}</select>
                      </div>)
                    break;
                  default:
                    break;
                }               
              })
            }         
            <div className="button_group">
              { this.props.type==='edit' ? 
                <button onClick={(e) => this.handleEdit(e)}>{this.props.update_text}</button>
                :
                <button onClick={(e) => this.handleCreate(e)}>{this.props.add_text}</button>
              }
              <button onClick={this.props.closePopup}>{this.props.cancel_text}</button>
            </div>
            </div>
            :null
          }
          {this.props.type==='delete' ? 
            <div>
              <div className="warning_title">Warning</div>
              <div className="warning_content">Are you sure you want to delete  {this.props.title} {this.props.data["id"]}?</div>
              <div className="button_group">
                <button id="delete_close_button" onClick={(e) => this.handleDelete(e)}>{this.props.delete_text}</button>
                <button onClick={this.props.closePopup}>{this.props.cancel_text}</button>
              </div>
            </div>
            :null
          }
          </div>
        </div>
      );
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
        dispatch : dispatch
      }
  }
export default connect(null, mapDispatchToProps)(PopupWindow);
