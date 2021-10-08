import * as types from '../actions/types';
import strapi from '../utils/strapi';
import { setAlert } from './alert';
import axios from 'axios';
import _ from 'lodash';

export const loadBooks = (data) => async dispatch => {
    try {
        dispatch({type: types.BOOKS_LOADING_STARTED});
        let books = (await axios.post(`${strapi}/graphql`, {query: `query { books {id name year favourite author {name} } }`})).data;
        dispatch({type: types.BOOKS_LOADED,payload: { books: books.data.books }});
    } catch (error) {
        dispatch(setAlert(error.toString(), 'is-danger'));
        dispatch({type: types.BOOKS_LOADING_ERROR})
    }
}

export const addBook = ({name, author, year }) => async dispatch => {
    try {
      let book = (await axios.post(`${strapi}/books`, {name, author, year })).data;
      dispatch({
        type: types.BOOK_ADDED,
        payload: book
      });
  
      dispatch(setAlert('Book added', 'success'));
    } catch (err) {
        console.log(err);
        dispatch(setAlert(err.toString(), 'is-danger'));
    }
};

export const bookUpdateFieldNewRecord = (e) => async dispatch => {
  if (e.target.type==='checkbox')  dispatch({
    type: types.BOOK_NEW_RECORD_FIELD,
    payload: {...e.target, value: e.target.checked}
  }) 
  else
  dispatch({
    type: types.BOOK_NEW_RECORD_FIELD,
    payload: e.target
  });
}

export const editBook = ({id, payload}) => async dispatch => {
  try {
    let book = (await axios.put(`${strapi}/books/${id}`, payload)).data;
    dispatch({
      type: types.BOOK_EDITED,
      payload: book
    });
  } catch (err) {
      console.log(err);
      dispatch(setAlert(err.toString(), 'is-danger'));
  }
};