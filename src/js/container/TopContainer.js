import React from "react";
import { render } from "react-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../../css/main.css';

class TopContainer extends React.Component {
	constructor(props) {
  	super(props)
  }
	render() {
  	return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
	
}

export default TopContainer;
