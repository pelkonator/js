import * as types from '../actions/types';
import strapi from '../utils/strapi';
import axios from 'axios';
import { setAlert } from './alert';

export const loadAuthors = (data) => async dispatch => {
    try {
        dispatch({type: types.AUTHORS_LOADING_STARTED})
        let authors = (await axios.post(`${strapi}/graphql`, {query: `query { authors {id name} }`})).data;
        dispatch({type: types.AUTHORS_LOADED,payload: {authors: authors.data.authors}})        
    } catch (error) {
        dispatch({type: types.AUTHORS_LOADING_ERROR})
    }
}

export const authorUpdateFieldNewRecord = (e) => async dispatch => {
    if (e.target.type==='checkbox')  dispatch({
      type: types.AUTHOR_NEW_RECORD_FIELD,
      payload: {...e.target, value: e.target.checked}
    }) 
    else
    dispatch({
      type: types.AUTHOR_NEW_RECORD_FIELD,
      payload: e.target
    });
  }

export const addAuthor = ({name}) => async dispatch => {
    try {
      let author = (await axios.post(`${strapi}/authors`, {name })).data;
      dispatch({
        type: types.AUTHOR_ADDED,
        payload: author
      });
  
      dispatch(setAlert('Author added', 'success'));
    } catch (err) {
        console.log(err);
        dispatch(setAlert(err.toString(), 'is-danger'));
    }
};