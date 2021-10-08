import React, {Fragment} from 'react'
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../routing/PrivateRoute';
import Navbar from './../layout/Navbar';

import Signin from './../Signin';
import Books from './../Books';
import Signup from './../Signup';
import AddBook from './../AddBook';
import AddAuthor from './../AddAuthor';

const Routes = () => {
    return (
        <Fragment>
            <Navbar/>
            <div className="container">
                <div className="section">
                    <Switch>
                        <Route exact path="/" component={Books}></Route>
                        <Route component={Signin} path="/signin" />
                        <Route component={Signup} path="/signup" />
                        <PrivateRoute component={AddBook} path="/books/new" />
                        <PrivateRoute component={AddAuthor} path="/authors/new" />
                        <PrivateRoute component={Books} path="/books" />                
                    </Switch>                    
                </div>
            </div>
        </Fragment>
    )
}

export default Routes
