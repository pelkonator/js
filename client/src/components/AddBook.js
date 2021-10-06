import React, { Component, Fragment } from 'react';
import Strapi from 'strapi-sdk-javascript/build/main'
import {Link } from 'react-router-dom'
import Loader from './Loader';
import history from "./../utils/history";
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl);
 
 class AddBook extends Component {
     state = {
        name:'',
        author: 0,
        year: '',
        authors: [],
        loading: true
     }
    async componentDidMount() {     
        try {
            const response = await strapi.request('POST', '/graphql', {data: {query: `query { authors {id name } }`}});
            this.setState({authors: response.data.authors});
        } catch (error) {
            console.log(error);
        }
        this.setState({loading: false});

        // try {
        //     const response = await strapi.request('POST', '/graphql', {data: {query: `query { books {id name year favourite } }`}})
        //     console.log(response);
        //     this.setState({books: response.data.books})
        // } catch (error) {
        //     console.log(error);
        // }
    }

    handleChange = (event) => {
        event.persist();
        if (event.target.type==='checkbox') this.setState({[event.target.name]: event.target.checked});
        else this.setState({[event.target.name]: event.target.value});
    }

    addBook = async () => {
        const {name, author, year } = this.state;
        try {
            await strapi.createEntry('books',{
                name,
                author,
                year
            });            
            history.push("/books");
        } catch (error) {
            console.log(error);
            alert('saving error, please check your input')
        }
    }

     render() {
         return (
            <Fragment>
                <Loader show={this.state.loading}/>
                {
                    !this.state.loading &&
                    <Fragment>
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input  class="input" placeholder="Name" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Author</label>
                            <div style={{display:'inline-block'}} class="select">
                                <select value={this.state.author} onChange={this.handleChange}  id="author" name="author">
                                    <option key="0">Choose an author</option>
                                    {this.state.authors.map(author=>{
                                        return <option key={author.id} value={author.id}>{author.name}</option>
                                    })}
                                </select>
                            </div>
                            <div style={{display:'inline-block', marginLeft:'10px', marginTop: '10px'}}>Or <Link to='/authors/new'>Add new</Link></div>
                        </div>
                        <div className="field">
                            <label className="label">Year</label>
                            <div className="control">
                                <input  class="input" placeholder="Year" name="year"  type="number" value={this.state.year} onChange={this.handleChange} />
                            </div>
                        </div>
                       

                        <button style={{marginBottom: '20px'}}  onClick={this.addBook} disabled={!this.state.name || !this.state.author || !this.state.year} className="button is-primary">Submit</button>
                        <br/>
                        <Link to='/books'>Back</Link>
                    </Fragment>
                }
               
            </Fragment>
         );
     }
 }
 
 export default AddBook;