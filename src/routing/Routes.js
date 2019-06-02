import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import LogguegOut from '../screens/LogguegOut'

export default class Routes extends Component<{}> {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>

			      <Scene key="login" component={Login} title="Login" initial={true}/>
			      <Scene key="signup" component={Signup} title="Register"/>
			    </Stack>
			 </Router>
			)
	}
}
