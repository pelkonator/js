import { combineReducers } from 'redux';
import alert from './alert';
import modal from './modal';
import auth from './auth';
import books from './books';
import authors from './authors';

import * as types from './../actions/types';
import storage from 'redux-persist/lib/storage';

const appReducer = combineReducers({
    alert, modal, auth, books, authors
})

const rootReducer = (state, action) => {
    if (action.type === types.CLEAR_STATE) {
        storage.removeItem('persist:root')
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer