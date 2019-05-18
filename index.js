import React, { Component } from 'react';
import { Text } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import Advanced_filter from '.src/screens/Advanced_filter';
import App_Butt_form from '.src/screens/App_Butt_form';
import App_form from '.src/screens/App_form';
import Calendar_profile from '.src/screens/Calendar_profile';
import Calendar from '.src/screens/Calendar';
import Config from '.src/screens/Config';
import Day_calendar_profile from '.src/screens/Day_calendar_profile';
import Event_page from '.src/screens/Event_page';
import Events from '.src/screens/Events';
import Guest_page from '.src/screens/Guest_page';
import Home from '.src/screens/Home';
import Landing_page from '.src/screens/Landing_page';
import Location_GPS from '.src/screens/Location_GPS';
import Login from '.src/screens/Login';
import MapFull from '.src/screens/MapFull';
import Menu from '.src/screens/Menu';
import Notifications from '.src/screens/Notifications';
import Post_page from '.src/screens/Post_page';
import Profile from '.src/screens/Profile';
import Search from '.src/screens/Search';
import Welcome from '.src/screens/Welcome';

const ElPlan = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="LandingPage"
          component={Landing_page}
          title="Landing page"
          initial
        />

        <Scene
          key="Advancedfilter"
          component={Advanced_filter}
          title="Advancedfilter"
        />
      </Scene>

        <Scene
          key="AppButtform"
          component={App_Butt_form}
          title="AppButtform"
        />
      </Scene>

      <Scene
          key="Calendarprofile"
          component={Calendar_profile}
          title="Calendarprofile"
        />
      </Scene>

      <Scene
          key="Calendar"
          component={Calendar}
          title="Calendar"
        />
      </Scene>

      <Scene
        key="Config"
        component={Config}
        title="Config"
      />
      </Scene>

      <Scene
        key="Daycalendarprofile"
        component={Day_calendar_profile}
        title="Daycalendarprofile"
      />
      </Scene>

      <Scene
        key="Eventpage"
        component={Event_page}
        title="Eventpage"
      />
      </Scene>

      <Scene
        key="Events"
        component={Events}
        title="Events"
      />
      </Scene>

      <Scene
        key="Guest_page"
        component={Guest_page}
        title="Guest_page"
      />
      </Scene>

      <Scene
        key="Home"
        component={Home}
        title="Home"
      />
      </Scene>

      <Scene
        key="LocationGPS"
        component={Location_GPS}
        title="LocationGPS"
      />
      </Scene>

      <Scene
        key="Login"
        component={Login}
        title="Login"
      />
      </Scene>

      <Scene
        key="MapFull"
        component={MapFull}
        title="MapFull"
      />
      </Scene>

      <Scene
        key="Menu"
        component={Menu}
        title="Menu"
      />
      </Scene>

      <Scene
        key="Notifications"
        component={Notifications}
        title="Notifications"
      />
      </Scene>

      <Scene
        key="Post_page"
        component={Post_page}
        title="Post_page"
      />
      </Scene>

      <Scene
        key="Profile"
        component={Profile}
        title="Profile"
      />
      </Scene>

      <Scene
        key="Search"
        component={Search}
        title="Search"
      />
      </Scene>

      <Scene
        key="Welcome"
        component={Welcome}
        title="Welcome"
      />
      </Scene>


    </Router>
  );
}

export default ElPlan;
