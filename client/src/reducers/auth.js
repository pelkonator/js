import * as types from '../actions/types';
import setAuthToken from '../utils/setAuthToken';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    user: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.USER_DATALOAD_STARTED:
            return {
                ...state, loading: true
            }
        case types.USERDATA_LOADED:
            return {
                ...state, isAuthenticated: true, loading: false
            }
        case types.LOGIN_SUCCESS:
        case types.REGISTER_SUCCESS:
            setAuthToken(action.payload.jwt);
            localStorage.setItem('token', action.payload.jwt);
            return { ...state, token: action.payload.jwt, user:action.payload.user, isAuthenticated: true}
        case types.AUTH_ERROR:
        case types.REGISTER_FAILURE:
        case types.LOGIN_FAILURE:
        case types.LOGOUT:
        case types.ACCOUNT_DELETED:
            localStorage.removeItem('token');
            setAuthToken('');
            return { ...state, token: null, isAuthenticated: false, loading: false }
        default:
            return state;
    }
}