
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, View, BackHandler } from 'react-native';
import { addNavigationHelpers, StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';

import ExploreTab from '../components/MainScreen/ExploreTab';
import ProfileTab from '../components/MainScreen/ProfileTab';
import EventScreen from '../components/EventScreen';

import Icon from 'react-native-vector-icons/Ionicons';

const tabConfig = {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#1ca1f2',
    inactiveTintColor: '#8899a6',
    labelStyle: {
      fontSize: 10,
      fontWeight: 'bold'
    },
    tabStyle: {
      paddingBottom: 0,
      borderTopWidth: 1,
      borderTopColor: '#1ca1f2',
      backgroundColor: '#16212c'
    },
    style: {
      backgroundColor: '#16212c',
    },
  },
}

export const MainScreen = TabNavigator({
  Explore: {
    screen: ExploreTab,
    navigationOptions: {
      tabBarLabel: 'BUSCAR',
      tabBarIcon: ({focused, tintColor}) => <Icon name={'ios-search-outline'} size={30} color={tintColor}/>
    }
  },
  Profile: {
    screen: ProfileTab,
    navigationOptions: {
      tabBarLabel: 'PERFIL',
      tabBarIcon: ({focused, tintColor}) => <Icon name={'ios-person-outline'} size={30} color={tintColor}/>
    }
  },
}, tabConfig);

export const AppNavigator = StackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: {
      header: null,
    }
  },
  Event: {
    screen: EventScreen,
    navigationOptions: (props) => ( {
      title: props.navigation.state.params.item.name,
    })
  },
});

class AppWithNavigationState extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#000"/>
        <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

const mapDispatchToProps = dispatch => ({
  dispatch: (action) => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);
