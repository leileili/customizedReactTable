import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route } from 'react-router-dom';
import TopContainer from '../container/TopContainer';
import Main from './Main';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import '../../css/main.css';

class App extends React.Component {
    constructor(props) {
      super(props)
    }
    
    render() {
      return (
        <BrowserRouter>
          <TopContainer>
              <Route exact path='/' component={Main} />
              <Route path='/page1' component={Page1} />
              <Route path='/page2' component={Page2} />
              <Route path='/page3' component={Page3} />
          </TopContainer>
        </BrowserRouter>
      )
    }
  }

  export default App;