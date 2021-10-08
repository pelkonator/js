import React, { Component, Fragment } from 'react';
import strapi from '../utils/strapi';
import {Link, NavLink} from 'react-router-dom'
import Loader from './Loader';
import { connect } from 'react-redux';
import axios from 'axios';
import {editBook, loadBooks} from '../actions/books';
 
 class Books extends Component {
    async componentDidMount() {        
        this.props.loadBooks();        
    }

    handleChange = async (event, id) => {
        event.persist();
        try {
            this.props.editBook({id, payload: {favourite: event.target.checked}});
        } catch (error) {
            console.log(error);
            alert('saving error, please check your input')
        }

    }

     render() {
         if (!this.props.isAuthenticated) return <div>Please <NavLink activeClassName="active" to='/signin'>Sign in</NavLink> or <NavLink activeClassName="active" to='/signup'>Sign up</NavLink> </div>;
         return (
             <Fragment>
                 <h1 style={{display: 'inline-block', marginRight: '20px'}} className="title">Books</h1> <Link to='/books/new'><button className="button is-primary">New book</button></Link>
                 <Loader show={this.props.books.loading && this.props.books.list===null}/>
                 {!this.props.books.loading && !this.props.books.list?.length && <div>No books found.</div>}
                 {
                    !this.props.books.loading && 
                    <Fragment>
                    <div className="row columns is-multiline">
                        {this.props.books.list?.map(book=>(
                            <div key={book.id} className="column is-4">
                                <div className="card large">
                                    <div className="card-content">
                                        <p className="subtitle is-4">{book.name}</p>
                                        <p className="subtitle is-6"><label>Author: </label><b>{book.author?.name}</b></p>
                                        <p className="subtitle is-6"><label>Year: </label><b>{book.year}</b></p>
                                        <p style={{textAlign: 'right'}}><label htmlFor={`favourite-${book.id}`} className="favorite-label">Favorite</label> <input name={`favourite-${book.id}`}  id={`favourite-${book.id}`} type="checkbox" checked={book.favourite} onChange={(event)=>{this.handleChange(event, book.id)}}/></p>
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

 const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    books: state.books
})
 
export default connect(mapStateToProps, {editBook, loadBooks})(Books);