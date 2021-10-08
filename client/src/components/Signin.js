import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../actions/alert';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import strapi from '../utils/strapi';

class Signin extends Component {
    state = {
        username:'',
        password:''
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {username, password} = this.state;

        if (this.isFormEmpty(this.state)) {
            this.props.setAlert('Please fill all fields', 'is-warning', 2000);
        }  else {
            this.props.login(username, password);
        }
    }

    isFormEmpty = ({username, password}) => {
        return !username || !password
    }

    handleChange = (event) => {
        event.persist();
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />; //!dashboard redirect
        }    
        return (
            <Fragment>
                <div className="box" style={{maxWidth: '500px', margin: '0 auto'}}>
                    <form onSubmit={this.handleSubmit} >
                        <div className="field">
                            <div className="control">
                                <input className="input" id="username" type="text" name="username" placeholder="Username" onChange={this.handleChange}  autoFocus=""/>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <input className="input" id="password" type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <button type="submit" className="button is-block is-primary is-large is-fullwidth">Login</button>
                    </form>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login, setAlert})(Signin);