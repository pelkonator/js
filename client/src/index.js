import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {Router, Switch, Route, Redirect } from 'react-router-dom';
import App from './components/App';
import Signin from './components/Signin';
import Books from './components/Books';
import Signup from './components/Signup';
import AddBook from './components/AddBook';
import AddAuthor from './components/AddAuthor';
import Navbar from './components/Navbar';
import {getToken} from './utils';
import history from "./utils/history";
import "gestalt/dist/gestalt.css";
import 'bulma/css/bulma.min.css';
import registerServiceWorker from './registerServiceWorker';

const PrivateRoute = ({component:Component, ...rest}) => (
    <Route {...rest} render={props=> (
        getToken()!==null ? 
            <Component {...props} /> : <Redirect to={{pathname: '/signin', state: {from: props.location} }}/>
    )}/>
)

const Root = () => (
    <Router history={history}>
        <Fragment>
            <Navbar/>
            <div className="container">
                <div className="section">
                    <Switch>
                        <Route component={App} exact path="/" />
                        <Route component={Signin} path="/signin" />
                        <Route component={Signup} path="/signup" />
                        <Route component={AddBook} path="/books/new" />
                        <Route component={AddAuthor} path="/authors/new" />
                        <Route component={Books} path="/books" />                
                    </Switch>                    
                </div>
            </div>
        </Fragment>
    </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();