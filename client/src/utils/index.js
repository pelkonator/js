const CART_KEY = 'cart';
const TOKEN_KEY = 'jwt';

export const getToken = (tokenKey=TOKEN_KEY) => {
    if (localStorage && localStorage.getItem(tokenKey)) {
        return JSON.parse(localStorage.getItem(tokenKey));
    }
    return null;
}

export const setToken = (value, tokenKey=TOKEN_KEY) => {
    if (localStorage) {
        localStorage.setItem(tokenKey, JSON.stringify(value));
    }
}

export const clearToken = (tokenKey=TOKEN_KEY) => {
    if (localStorage) {
        localStorage.removeItem(tokenKey);
    }
}