import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, ActivityIndicator, AsyncStorage, Alert, Dimensions, FlatList } from 'react-native';
import Logo from '../components/Logo';
import { Actions } from 'react-native-router-flux';
import { validateSignup } from "../utils/validation";
import { sendDataToSignUp, sendPictureToSignUp } from "../utils/signup";
import DatePicker from 'react-native-datepicker'
import { ImagePicker, Permissions, Constants } from 'expo';
import SwitchSelector from "react-native-switch-selector";
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { sendDataToLogIn, storeToken, getToken, removeToken} from '../utils/login';
import { setUserData, getName, getID, setUserPicture, getUrl} from '../utils/home';
import { getEvents, getFilter, setEventPicture } from '../utils/events';

class Home extends Component {

  constructor(props) {
    this.state = {
      isLoading: false,
      name: '',
      source: { uri: ''},
      search: '',
      error: '',
      dataset: null,
      datasetState: null,
    };

  }

  advanced_filter() {
    Actions.advanced_filter()
  }

  events() {
    Actions.events()
  }

  home(){
    Actions.home()
  }

  menu() {
    Actions.menu()
  }

  profile() {
    Actions.profile()
  }

  async componentWillMount() {
    await this.GetInfo()
  }

  async GetInfo() {
    this.setState(
      {
        isLoading: true
      }
    );
    try {
      let token = await getToken()
      console.log("Home | token: " + token)
      await setUserData(token);
      let id = await getID();
      await setUserPicture(id);
      let link = await getUrl();
      this.setState(
        {
          name: await getName(),
          source: { uri: `${link}` + '?' + new Date()}
        }
      )
      console.log("Home | User id: " + id)
    } catch (error) {
      console.log("Home | error: " + error)
    }
    this.setState(
      {
        isLoading: false
      }
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <View style={styles.container2}>
            <Text style={styles.headling}>ENTRANDO...</Text>
            <ActivityIndicator size="large" color="#00CCFF" />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.homeTextCont}>
          <TouchableOpacity onPress={this.menu}>
            <Text style={styles.signupButton}> MENU </Text>
          </TouchableOpacity>
          <Text style={styles.signupButton2}>{this.state.name}</Text>
          <TouchableOpacity onPress={this.profile}>
            <Image style={styles.profilePhoto} source={this.state.source} />
          </TouchableOpacity>
        </View>
        <View style={styles.container3}>
          <TextInput style={styles.searchBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Are you looking for an event?"
            maxLength={100}
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
            keyboardType="default"
            onChangeText={(search) => this.setState({ search })}
            value={this.state.search}
          />
          <TouchableOpacity style={styles.buttonFilters}
            onPress={() => this.advanced_filter()}>
            <Text style={styles.buttonText}>Advanced Filters</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupTextCont}>
          <TouchableOpacity onPress={this.home}>
            <Text style={styles.icons}> HOME </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.events}>
            <Text style={styles.icons}> NEW EVENT </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.home}>
            <Text style={styles.icons}> SEARCH </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#707070',
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center'
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  homeTextCont2: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  homeTextCont: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingTop: wp('5%'),
    paddingBottom: wp('3%'),
    backgroundColor: '#00CCFF',
  },
  TitleText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 20
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16
  },
  text: {
    marginTop: 8,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'
  },
  signupButton2: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '500'
  },
  icons: {
    color: '#00CCFF',
    fontSize: 16,
    fontWeight: '500'
  },
  container2: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container3: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBox: {
    width: 300,
    height: 45,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10
  },
  searchBox: {
    width: wp('80%'),
    height: 45,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10
  },
  buttonFilters: {
    width: wp('80%'),
    backgroundColor: '#00CCFF',
    borderRadius: 25,
    marginBottom: 10,
    paddingVertical: 10
  },
  button: {
    width: 300,
    backgroundColor: '#00CCFF',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },
  headling: {
    color: '#00CCFF',
    fontSize: hp('6%'),
    textAlign: 'center',
    margin: hp('5%'),
  },
  uploadImage: {
    height: wp('50%'),
    width: wp('50%'),
    marginTop: hp('3%'),
    marginBottom: hp('3%'),
    marginRight: wp('3%'),
    marginLeft: wp('3%'),
  },
  profilePhoto: {
    height: hp('8%'),
    width: hp('8%'),
    // marginTop: hp('6%'),
    // marginBottom: hp('6%'),
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: '#FFFFFF'
  },
  switch: {
    width: wp('60%'),
    marginTop: 8,
  },
  uploadImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  datepicker: {
    marginTop: 8,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  image: {
    width: Dimensions.get('window').width-80,
    height: Dimensions.get('window').width *4/7,
    marginBottom: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  containerEvents: {
    padding: 20,
    backgroundColor: 'white',
  },
});
