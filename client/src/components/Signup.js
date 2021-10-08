import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import { connect } from 'react-redux';
import strapi from '../utils/strapi';
class Signup extends Component {
    state = {
        username:'',
        email:'',
        password:''
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {username, email, password} = this.state;

        if (this.isFormEmpty(this.state)) {
            this.props.setAlert('Please fill all fields', 'is-warning', 2000);            
        }  else {
            this.props.register({ username, email, password });
        }
    }

    isFormEmpty = ({username, email, password}) => {
        return !username || !email || !password
    }

    handleChange = (event) => {
        event.persist();
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
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
                                <input className="input" id="email" type="email" name="email" placeholder="Email address" onChange={this.handleChange}  autoFocus=""/>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <input className="input" id="password" type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <button type="submit" disabled={this.state.loading}  className="button is-block is-primary is-large is-fullwidth">Register</button>
                    </form>
                </div>
            </Fragment>
        );
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, register})(Signup);