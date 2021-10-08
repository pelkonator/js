import * as types from '../actions/types';
const initialState = {
    loading: false,
    list: null,
    newRecord: {
        name: '',
        author: 0,
        year: 0
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.BOOKS_LOADING_STARTED:
            return {
                ...state, loading: true
            }
        case types.BOOKS_LOADING_ERROR:
            return {
                ...state, loading: false
            }
        case types.BOOKS_LOADED:
            return {
                ...state, loading: false, list: action.payload.books
            }
        case types.BOOK_ADDED:
            return {
                ...state, list: [...state.list, action.payload]
            }
        case types.BOOK_NEW_RECORD_FIELD:
            return {
                ...state, newRecord: {...state.newRecord, [action.payload.name]: action.payload.value}
            }      
        case types.BOOK_EDITED:
            return {
                ...state, list: state.list.map(b=>{
                    return b.id.toString()===action.payload.id.toString()?action.payload:b
                })
            }
        case types.CLEAR_BOOKS:
            return initialState
        default:
            return state;
    }
}