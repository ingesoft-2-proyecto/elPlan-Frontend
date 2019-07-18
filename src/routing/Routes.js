import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import App_form from '../screens/App_form';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Menu from '../screens/Menu';
import Notifications from '../screens/Notifications';
import Advanced_filter from '../screens/Advanced_filter';
import Events from '../screens/Events';

export default class Routes extends Component<{}> {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="login" component={Login} title="Login" initial={true}/>
			      <Scene key="signup" component={Signup} title="Register"/>
						<Scene key="app_form" component={App_form} title="App_Form"/>
						<Scene key="home" component={Home} title="Home"/>
						<Scene key="profile" component={Profile} title="profile" />
						<Scene key="menu" component={Menu} title="menu" />
						<Scene key="notifications" component={Notifications} title="notifications" />
						<Scene key="advanced_filter" component={Advanced_filter} title="advanced_filter" />
						<Scene key="events" component={Events} title="events" />
					</Stack>
			 </Router>
			)
	}
}
