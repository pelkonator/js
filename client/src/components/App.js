import React, { Fragment/*, useEffect */ } from 'react';
import './App.sass';
import Routes from './../components/routing/Routes'
import Alert from './layout/Alert';
import history from './../utils/history'

import {Router, Route, Switch } from 'react-router-dom';
//Redux
import { Provider } from 'react-redux';
import { store, persistor } from './../store';
import { PersistGate } from 'redux-persist/integration/react'
import setAuthToken from './../utils/setAuthToken';
import { loadUserData } from './../actions/auth';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
  store.dispatch(loadUserData());
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <Fragment>
            <Alert /> 
            <Switch>
              <Route component={Routes}></Route>
            </Switch>
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  )
};
export default App;