import React, { Component } from 'react';
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
                this.showToast(error.message);
            }
        }
    }

    redirectUser = path => this.props.history.push(path);

    isFormEmpty = ({username, password}) => {
        return !username || !password
    }

    handleChange = ({event, value}) => {
        event.persist();
        this.setState({[event.target.name]: value});
    }

    showToast = (toastMessage) => {
        this.setState({toast:true, toastMessage});
        setTimeout(()=>this.setState({toast:false, toastMessage: ''}), 5000);
    }

    render() {
        return (
            <Container>
                <Box dangerouslySetInlineStyle={{__style: {backgroundColor:'#d6a3b1'}}} wrap shape="rounded" display="flex" justifyContent="center"  margin={4} padding={4}>
                   <form onSubmit={this.handleSubmit} style={{display: 'inlineBlock', textAlign: 'center', maxWidth:450}}> 
                        <Box marginBottom={2} display="flex" direction="column" alignItems="center">
                            <Heading color="midnight">Welcome back!</Heading>
                        </Box>
                        <TextField id="username" type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                        <TextField id="password" type="password" name="password" placeholder="Password" onChange={this.handleChange} />                    
                        <Button disabled={this.state.loading} inline color="blue" text="submit" type="submit"/>
                   </form>
                </Box>
                <ToastMessage show={this.state.toast} message={this.state.toastMessage}/>
            </Container>
        );
    }
}

export default Signin;