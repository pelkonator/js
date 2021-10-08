import * as types from '../actions/types';
const initialState = {
    loading: false,
    list: null,
    newRecord: {
        name: ''
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.AUTHORS_LOADING_STARTED:
            return {
                ...state, loading: true
            }
        case types.AUTHORS_LOADING_ERROR:
            return {
                ...state, loading: false
            }
        case types.AUTHORS_LOADED:
            return {
                ...state,loading: false, list: action.payload.authors
            }
        case types.AUTHOR_ADDED:
            return {
                ...state, list: [...state.list, action.payload]
            }
        case types.AUTHOR_NEW_RECORD_FIELD:
            return {
                ...state, newRecord: {...state.newRecord, [action.payload.name]: action.payload.value}
            }      
        case types.CLEAR_AUTHORS:
            return initialState
        default:
            return state;
    }
}