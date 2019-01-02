import React from "react";
import { render } from "react-dom";
import { Link } from 'react-router-dom';
import '../../css/main.css';
import '../../css/header.css';

class Header extends React.Component {
	render() {
  	return (
    <div id="header" className="header">
  	  <div style={{"cursor":"pointer"}}><Link to="/page1">Notes</Link></div>
      <div style={{"cursor":"pointer"}}><Link to="/page2">Tasks</Link></div>
      <div style={{"cursor":"pointer"}}><Link to="/page3">Contacts</Link></div>
  	</div>
  
    )
  }
}

export default Header;