import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import createReduxStore from './createReduxStore';

import { Provider } from 'react-redux';

import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import AddClient from './components/clients/AddClient';
import EditClient from './components/clients/EditClient';
import ClientDetails from './components/clients/ClientDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Settings from './components/settings/Settings';

const fbConfig = {
  apiKey: 'AIzaSyCuBhpk55oERl6ohXLgkiMPZgMz_yCVKHQ',
  authDomain: 'client-panel-react.firebaseapp.com',
  databaseURL: 'https://client-panel-react.firebaseio.com',
  projectId: 'client-panel-react',
  storageBucket: 'client-panel-react.appspot.com',
  messagingSenderId: '497687887452'
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

firebase.initializeApp(fbConfig);

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const store = createReduxStore();

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router>
            <div className="App">
              <AppNavbar />
              <div className="container">
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={UserIsAuthenticated(Dashboard)}
                  />
                  <Route
                    exact
                    path="/client/add"
                    component={UserIsAuthenticated(AddClient)}
                  />
                  <Route
                    exact
                    path="/client/edit/:id"
                    component={UserIsAuthenticated(EditClient)}
                  />
                  <Route
                    exact
                    path="/client/:id"
                    component={UserIsAuthenticated(ClientDetails)}
                  />
                  <Route
                    exact
                    path="/login"
                    component={UserIsNotAuthenticated(Login)}
                  />
                  <Route
                    exact
                    path="/register"
                    component={UserIsNotAuthenticated(Register)}
                  />
                  <Route
                    exact
                    path="/settings"
                    component={UserIsAuthenticated(Settings)}
                  />
                </Switch>
              </div>
            </div>
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}

export default App;
