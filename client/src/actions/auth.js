import axios from 'axios';
import * as types from '../actions/types';
import {loadBooks} from '../actions/books';
import {loadAuthors} from '../actions/authors';
import { setAlert } from './alert';
import history from './../utils/history'
import strapi from '../utils/strapi';

export const loadUserData = (data) => async dispatch => {
    try {
        dispatch(loadBooks());
        dispatch(loadAuthors());
    } catch (error) {
        dispatch(setAlert('Loading error', 'is-danger'));
    }
}

//Register User
export const register = ({ username, email, password }) => async dispatch => {
    try {
        const response = (await axios.post(`${strapi}/auth/local/register`, { username, email, password })).data;
        dispatch({ type: types.REGISTER_SUCCESS, payload: response });
    } catch (error) {
        if (error) {
            dispatch(setAlert(error, 'is-danger'));
        }
        dispatch({ type: types.REGISTER_FAILURE });
    }
}

export const login = (email, password) => async dispatch => {
    try {
        const response = (await axios.post(`${strapi}/auth/local`, { identifier:email, password })).data;
        dispatch({ type: types.LOGIN_SUCCESS, payload: response });
        dispatch(loadUserData());
    } catch (error) {
        if (error) {
            dispatch(setAlert(error, 'is-danger'));
        }
        dispatch({ type: types.LOGIN_FAILURE });
    }
}

//Logout User / Clear Profile
export const logout = () => dispatch => {
    dispatch({ type: types.LOGOUT });
    dispatch({ type: types.CLEAR_PROFILE });
    dispatch({ type: types.CLEAR_BOOKS });
    dispatch({ type: types.CLEAR_AUTHORS });
}

