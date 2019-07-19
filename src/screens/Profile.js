import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, ActivityIndicator, AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { sendDataToLogIn, storeToken, getToken, removeToken } from '../utils/login';
import { setUserData, getName, getID, setUserPicture, getUrl, getAge, getEmail, getLastname } from '../utils/home';
import { getEvents, getFilter, setEventPicture } from '../utils/events';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: '',
      lastname: '',
      fullname: '',
      age: '',
      email: '',
      source: { uri: '' },
      error: '',
    };

  }


  notifications() {
    Actions.notifications()
  }

  home() {
    Actions.home()
  }

  menu() {
    Actions.menu()
  }

  profileupdate() {
    Actions.profileupdate()
  }

  async componentWillMount() {
    await this.GetInfo()
  }

  async GetInfo() {
    this.setState(
      {
        isLoading: true
      }
    )
    try {
      let token = await getToken()
      console.log(token)
      await setUserData(token);
      let id = await getID();
      console.log(id)
      await setUserPicture(id);
      let link = await getUrl();
      console.log(link)
      this.setState(
        {
          name: await getName(),
          lastname: await getLastname(),
          age: await getAge(),
          email: await getEmail(),
          source: { uri: `${link}` + '?' + new Date() }
        }
      )
      console.log("Profile | User id: " + id)
      console.log("Profile | User age: " + age)
    } catch (error) {
      console.log("Profile | error: " + error)
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
            <Text style={styles.headling}>INGRESANDO PERFIL...</Text>
            <ActivityIndicator size="large" color="#00CCFF" />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.profileTextCont}>
          <Text style={styles.icons2}>{`${this.state.name}_${this.state.lastname}`}</Text>
          <TouchableOpacity onPress={this.profileupdate}>
            <Text style={styles.signupButton2}>UPDATE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container3}>
          <Image style={styles.profilePhoto2} source={this.state.source} />
        </View>
        <View style={styles.profileTextCont2}>
          <Text style={styles.icons2}>NAME: </Text>
          <Text style={styles.signupButton2}>{this.state.name}</Text>
        </View>
        <View style={styles.profileTextCont2}>
          <Text style={styles.icons2}>LASTNAME: </Text>
          <Text style={styles.signupButton2}>{this.state.lastname}</Text>
        </View>
        <View style={styles.profileTextCont2}>
          <Text style={styles.icons2}>AGE: </Text>
          <Text style={styles.signupButton2}>{this.state.age}</Text>
        </View>
        <View style={styles.profileTextCont2}>
          <Text style={styles.icons2}>EMAIL: </Text>
          <Text style={styles.signupButton2}>{this.state.email}</Text>
        </View>
        <View style={styles.signupTextCont}>
          <TouchableOpacity onPress={this.home}>
            <Text style={styles.icons}> HOME </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.notifications}>
            <Text style={styles.icons}> NOTIFICATIONS </Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  profileTextCont: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingTop: wp('6%'),
    paddingBottom: wp('3%'),
  },
  profileTextCont2: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingTop: wp('5%'),
    paddingBottom: wp('3%'),
    marginHorizontal: wp('5%'),
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
  icons2: {
    color: '#00CCFF',
    fontSize: 24,
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
  profilePhoto2: {
    height: wp('60%'),
    width: wp('60%'),
    // marginTop: hp('6%'),
    // marginBottom: hp('6%'),
    marginVertical: wp('5%'),
    marginHorizontal: wp('5%'),
    borderRadius: 100,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: '#FFFFFF'
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
});