import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import LoggedOut from './src/screens/LoggedOut';
import Login from './src/screens/Login';
import ForgotPassword from './src/screens/ForgotPassword';


export default class App extends Component<{}> {
  render() {

    return (
     <provider store =  {store}>
     <Login />
    </provider>
  );
  }
}
