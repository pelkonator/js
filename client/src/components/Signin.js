import React, { Component, Fragment } from 'react';
import {Container, Box, Button, Heading, TextField} from 'gestalt'
import ToastMessage from './ToastMessage';
import {setToken} from './../utils';
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl);

class Signin extends Component {
    state = {
        username:'',
        password:'',
        toast: false,
        toastMessage: '',
        loading: false
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {username, password} = this.state;

        if (this.isFormEmpty(this.state)) {
            this.showToast('Fill all fields');
        }  else {
            try {
                //set loading-true
                this.setState({loading: true});
                //send strapi request
                const response = await strapi.login(username, password);
                //set loading-false
                this.setState({loading: false});
                //put token to local storage
                setToken(response.jwt);
                //redirect user to home page
                this.redirectUser('/');
            } catch (error) {
                // set loading - false
                this.setState({loading: false});
                //show error msg
                this.showToast('Login error');
            }
        }
    }

    redirectUser = path => this.props.history.push(path);

    isFormEmpty = ({username, password}) => {
        return !username || !password
    }

    handleChange = (event) => {
        event.persist();
        this.setState({[event.target.name]: event.target.value});
    }

    showToast = (toastMessage) => {
        this.setState({toast:true, toastMessage});
        setTimeout(()=>this.setState({toast:false, toastMessage: ''}), 5000);
    }

    render() {
        return (
            <Fragment>
                <div className="box" style={{maxWidth: '500px', margin: '0 auto'}}>
                    <form onSubmit={this.handleSubmit} >
                        <div className="field">
                            <div className="control">
                                <input class="input" id="username" type="text" name="username" placeholder="Username" onChange={this.handleChange}  autofocus=""/>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <input class="input" id="password" type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <button type="submit" disabled={this.state.loading}  className="button is-block is-primary is-large is-fullwidth">Login</button>
                    </form>
                </div>
                <ToastMessage show={this.state.toast} message={this.state.toastMessage}/>
            </Fragment>
        );
    }
}

export default Signin;