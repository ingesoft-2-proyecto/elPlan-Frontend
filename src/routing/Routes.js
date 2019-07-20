console.log("Routes.js in routing initial");

import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import { Provider } from 'react-redux';

import configureStore from '../redux/configureStore';
import LoggedOut from '../screens/LoggedOut';

import LoggedOut from '../screens/LoggedOut';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import App_form from '../screens/App_form';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Menu from '../screens/Menu';
import Notifications from '../screens/Notifications';
import Advanced_filter from '../screens/Advanced_filter';
import Events from '../screens/Events';
import ProfileUpdate from '../screens/ProfileUpdate';

export default class Routes extends Component<{}> {

	constructor() {
    super();
		console.log("********************** Routes.js in routing constructor() ++++++++++++++++++++++");
		window.events = "events";
		this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false })),
    };
  }

	render() {
		return(
<<<<<<< master
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
						<Scene key="profileupdate" component={ProfileUpdate} title="profileupdate" />
					</Stack>
			 </Router>
=======
			console.log("Routes.js in routing render()"),
			<Provider store={this.state.store}>
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
						  <Scene key="profileupdate" component={ProfileUpdate} title="profileupdate" />
						</Stack>
				 </Router>
				</Provider>
>>>>>>> canietot - Se carga desarrollo para visualizacion de eventos.
			)
	}
}
