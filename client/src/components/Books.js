import React, { Component, Fragment } from 'react';
import Strapi from 'strapi-sdk-javascript/build/main'
import {Link} from 'react-router-dom'
import Loader from './Loader';
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl);
 
 class Books extends Component {
     state = {
         books:[], 
         brandName:'',
         cartItems: [],
         loading: true
     }
    async componentDidMount() {        
        try {
            const response = await strapi.request('POST', '/graphql', {data: {query: `query { books {id name year favourite author {name} } }`}})
            this.setState({books: response.data.books})
        } catch (error) {
            console.log(error);
        }
        this.setState({loading: false});
    }

    handleChange = async (event, id) => {
        event.persist();
        try {
            const checked = event.target.checked;
            await strapi.updateEntry('books', id, {
                favourite: checked
            });
            this.setState({books: this.state.books.map(b=>b.id===id?{...b, favourite: checked}:b) });
        } catch (error) {
            console.log(error);
            alert('saving error, please check your input')
        }

    }

     render() {
         return (
             <Fragment>
                 <h1 style={{display: 'inline-block', marginRight: '20px'}} className="title">Books</h1> <Link to='/books/new'><button className="button is-primary">New book</button></Link>
                 <Loader show={this.state.loading}/>
                 {!this.state.loading && !this.state.books.length && <div>No books found.</div>}
                 {
                    !this.state.loading && 
                    <Fragment>
                    <div className="row columns is-multiline">
                        {this.state.books.map(book=>(
                            <div key={book.id} className="column is-4">
                                <div className="card large">
                                    <div className="card-content">
                                        <p className="subtitle is-4">{book.name}</p>
                                        <p className="subtitle is-6"><label>Author: </label><b>{book.author.name}</b></p>
                                        <p className="subtitle is-6"><label>Year: </label><b>{book.year}</b></p>
                                        <p style={{textAlign: 'right'}}><label className="favorite-label">Favorite</label> <input name={`favourite-${book.id}`}  id={`favourite-${book.id}`} type="checkbox" checked={book.favourite} onChange={(event)=>{this.handleChange(event, book.id)}}/></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    </Fragment>         
                 }
             </Fragment>
         );
     }
 }
 
 export default Books;