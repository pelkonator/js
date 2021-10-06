import React, { Component } from 'react';
import {NavLink, withRouter} from 'react-router-dom'
import {getToken, clearToken, clearCart} from './../utils'

class Navbar extends Component {

    handleSignout = () => {
        clearToken();
        clearCart();
        this.props.history.push('/');
    }
    
    render() {
        return getToken() !== null ? <AuthNav handleSignout={this.handleSignout}/> : <UnAuthNav/>;
    }
}

const AuthNav = ({handleSignout}) => {
    return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
        <NavLink to='/'>
            <h1 className="title">Book list</h1>
        </NavLink>
        </div>
        <div id="navbarMenu" className="navbar-menu">
          <div className="navbar-end">
            <button onClick={handleSignout}  className="button is-primary">Sign out</button>
          </div>
        </div>
      </div>
    </nav>
    );
};

const UnAuthNav = () => {
    return (

    <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
          <NavLink to='/'>
                <h1 className="title">Book list</h1>
          </NavLink>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end">
                <NavLink activeClassName="active" to='/signin'><button className="button is-primary">Sign in</button></NavLink>
                <NavLink activeClassName="active" to='/signup'><button className="button is-link">Sign up</button></NavLink>
            </div>
          </div>
        </div>
      </nav>
    );
};

export default withRouter(Navbar);