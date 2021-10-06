import React, { Fragment, Component } from 'react';
import './App.css';
import {NavLink } from 'react-router-dom'
import {getToken} from './../utils'
import Books from './Books'

class App extends Component {
  render() {
    return (
      getToken() !== null ? 
      <Books/>
      :
      <Fragment>
        <div>Please <NavLink activeClassName="active" to='/signin'>Sign in</NavLink> or <NavLink activeClassName="active" to='/signup'>Sign up</NavLink> </div>
      </Fragment>
      
    );
  }
}

export default App;