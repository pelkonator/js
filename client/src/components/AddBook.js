import React, { Component, Fragment } from 'react';
import strapi from '../utils/strapi';
import {Link } from 'react-router-dom'
import Loader from './Loader';
import {addBook, bookUpdateFieldNewRecord} from '../actions/books';
import history from "./../utils/history"; 
import { connect } from 'react-redux';
import {loadAuthors} from '../actions/authors';
 class AddBook extends Component {
    //  state = {
    //     name:'',
    //     author: 0,
    //     year: '',
    //  }

     async componentDidMount() {        
        this.props.loadAuthors();        
    }

    handleChange = (event) => {
        event.persist();
        this.props.bookUpdateFieldNewRecord(event);         
    }

    addBook = async () => {
        const {name, author, year } = this.props.books.newRecord;
        try {
            await this.props.addBook({name, author, year });
            history.push("/books");
        } catch (error) {
            console.log(error);
            alert('saving error, please check your input')
        }
    }

     render() {
        const {name, year, author} = this.props.books.newRecord;
         return (
            <Fragment>
                <Loader show={this.props.authors.loading && this.props.authors.list===null}/>
                {
                    !(this.props.authors.loading  && this.props.authors.list===null) &&
                    <Fragment>
                        <div style={{maxWidth: '500px', margin: '0 auto'}}>
                            <h1 className="title">New book</h1>
                            <div className="box">
                                <div className="field">
                                    <label className="label">Name</label>
                                    <div className="control">
                                        <input className="input" placeholder="Name" name="name" type="text" value={name} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Author</label>
                                    <div style={{display:'inline-block'}} className="select">
                                        <select value={author} onChange={this.handleChange}  id="author" name="author">
                                            <option key="0">Choose an author</option>
                                            {this.props.authors.list?.map(author=>{
                                                return <option key={author.id} value={author.id}>{author.name}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div style={{display:'inline-block', marginLeft:'10px', marginTop: '10px'}}>Or <Link to='/authors/new'>Add new</Link></div>
                                </div>
                                <div className="field">
                                    <label className="label">Year</label>
                                    <div className="control">
                                        <input  className="input" placeholder="Year" name="year"  type="number" value={year} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <button style={{marginBottom: '20px'}}  onClick={this.addBook} disabled={!name || !author || !year} className="button is-primary">Submit</button>
                            </div>
                            <Link to='/books'>Back</Link>
                        </div>
                    </Fragment>
                }
               
            </Fragment>
         );
     }
 }
 
 const mapStateToProps = state => ({
    authors: state.authors,
    books: state.books
})
 
export default connect(mapStateToProps, {addBook, loadAuthors, bookUpdateFieldNewRecord})(AddBook);