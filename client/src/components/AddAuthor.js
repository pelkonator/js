import React, { Component, Fragment } from 'react';
import strapi from '../utils/strapi';
import {Link } from 'react-router-dom'
import history from "./../utils/history"; 
import {addAuthor, authorUpdateFieldNewRecord} from '../actions/authors';
import { connect } from 'react-redux';
 class AddAuthor extends Component {
    handleChange = (event) => {
        event.persist();
        this.props.authorUpdateFieldNewRecord(event);
    }

    addAuthor = async () => {
        const {name} = this.props.authors.newRecord;
        try {
            await this.props.addAuthor({name});
            history.push("/books/new");
        } catch (error) {
            console.log(error);
            alert('saving error, please check your input')
        }
    }

     render() {
         const {name} = this.props.authors.newRecord;
         return (
            <Fragment>
                <div style={{maxWidth: '500px', margin: '0 auto'}}>
                    <h1 className="title">New author</h1>
                    <div className="box">
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input  className="input" placeholder="Author name" name="name" type="text" value={name} onChange={this.handleChange} />
                            </div>
                        </div>
                        <button style={{marginBottom: '20px'}}  disabled={!name} onClick={this.addAuthor} className="button is-primary">Submit</button>
                    </div>
                    <Link to='/books/new'>Back</Link>    
                </div>           
            </Fragment>
         );
     }
 }
 

 
 const mapStateToProps = state => ({
    authors: state.authors
})
 
export default connect(mapStateToProps, {addAuthor, authorUpdateFieldNewRecord})(AddAuthor);