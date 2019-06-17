import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import App_form from '../screens/App_form';
import Home from '../screens/Home';

export default class Routes extends Component<{}> {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="login" component={Login} title="Login" initial={true}/>
			      <Scene key="signup" component={Signup} title="Register"/>
						<Scene key="app_form" component={App_form} title="App_Form"/>
						<Scene key="home" component={Home} title="Home"/>
			    </Stack>
			 </Router>
			)
	}
}
