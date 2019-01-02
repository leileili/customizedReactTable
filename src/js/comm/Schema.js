import React from "react";
const Schema = {
	"Task":{
		 "properties":{
			 "url":{
				 "get":/*"http:s//wwww.dddd.com/prefix/"+*/"Task",
				 "post":/*"http:s//wwww.dddd.com/prefix/"+*/"Task",
				 "put":/*"http:s//wwww.dddd.com/prefix/"+*/"Task",
				 "delete":/*"http:s//wwww.dddd.com/prefix/"+*/"Task"
			 }
		 },
		 "fields":[
			{"name":"priority","label":"Priority","type":"string","width":"100", "formType":"input", "tableType":"text","editable":"yes","validate":["required"]},
			{"name":"id","label":"Task Id", "type":"number","width":"200", "formType":"hidden", "tableType":"text","editable":"no","validate":[]},
			{"name":"task","label":"Task", "type":"string","width":"400", "formType":"textarea", "tableType":"text","editable":"yes","validate":[]},
			{"name":"createdby","label":"Created By", "type":"string", "width":"300","formType":"input", "tableType":"text","editable":"yes","validate":[], 
				"cellRenderer":function(row) {
					return <div style={{"background":"green"}}>{row.original.createdby}</div>
				}
			},
			{"name":"status","label":"Status", "type":"string", "width":"200","formType":"select", "tableType":"text","editable":"yes","validate":[],"options":[{"id":"status1", "label":"Completed"}, {"id":"status2", "label":"Pending"}, {"id":"status3", "label":"In-progress"}],
				"cellRenderer":function(row) {
					return <span style={{
						color: row.value === 'Completed' ? '#ff2e00'
						: row.value === 'Pending' ? '#ffbf00'
						: '#57d500'}}> &#x25cf;{row.value}
					</span>
				}
			},
			{"name":"edit","label":"Edit", "type":"", "width":"200","tableType":"text","editable":"no","validate":[]}
		],
		
	},
	"Note":{
		"properties":{
			"url":{
				"get":/*"http:s//wwww.dddd.com/prefix/"+*/"Note",
				"post":/*"http:s//wwww.dddd.com/prefix/"+*/"Note",
				"put":/*"http:s//wwww.dddd.com/prefix/"+*/"Note",
				"delete":/*"http:s//wwww.dddd.com/prefix/"+*/"Note"
			}
		},
		"fields":[
		   {"name":"priority","label":"Priority","type":"string","width":"100", "formType":"input", "tableType":"text","editable":"yes","validate":["required"]},
		   {"name":"id","label":"Note Id", "type":"number","width":"200", "formType":"hidden", "tableType":"text","editable":"no","validate":[]},
		   {"name":"note","label":"Note", "type":"string","width":"400", "formType":"textarea", "tableType":"text","editable":"yes","validate":[]},
		   {"name":"createdby","label":"Created By", "type":"string", "width":"300","formType":"input", "tableType":"text","editable":"yes","validate":[], 
			   "cellRenderer":function(row) {
				   return <div style={{"background":"green"}}>{row.original.createdby}</div>
			   }
		   },
		   {"name":"status","label":"Status", "type":"string", "width":"200","formType":"select", "tableType":"text","editable":"yes","validate":[],"options":[{"id":"status1", "label":"Completed"}, {"id":"status2", "label":"Pending"}, {"id":"status3", "label":"In-progress"}],
			   "cellRenderer":function(row) {
				   return <span style={{
					   color: row.value === 'Completed' ? '#ff2e00'
					   : row.value === 'Pending' ? '#ffbf00'
					   : '#57d500'}}> &#x25cf;{row.value}
				   </span>
			   }
		   },
		   {"name":"edit","label":"Edit", "type":"", "width":"200","tableType":"text","editable":"no","validate":[]}
	   ],
	   
   }
}

export default Schema;
