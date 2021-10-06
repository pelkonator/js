import React, { Component, Fragment } from 'react';
import Strapi from 'strapi-sdk-javascript/build/main'
import {Link } from 'react-router-dom'
import history from "./../utils/history";
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl);
 
 class AddAuthor extends Component {
     state = {
        name:'',
     }

    handleChange = (event) => {
        event.persist();
        this.setState({[event.target.name]: event.target.value});
    }

    addAuthor = async () => {
        const {name} = this.state;
        try {
            await strapi.createEntry('authors',{
                name
            });            
            history.push("/books/new");
        } catch (error) {
            console.log(error);
            alert('saving error, please check your input')
        }
    }

     render() {
         return (
            <Fragment>
                <h1 className="title">New author</h1>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input  class="input" placeholder="Author name" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                    </div>
                </div>
                <button style={{marginBottom: '20px'}}  disabled={!this.state.name} onClick={this.addAuthor} className="button is-primary">Submit</button>
                <br/>
                <Link to='/books/new'>Back</Link>               
            </Fragment>
         );
     }
 }
 
 export default AddAuthor;