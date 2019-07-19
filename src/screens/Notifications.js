import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, ActivityIndicator, AsyncStorage, Alert } from 'react-native';
import Logo from '../components/Logo';
import { Actions } from 'react-native-router-flux';
import { validateSignup } from "../utils/validation";
import { sendDataToSignUp, sendPictureToSignUp } from "../utils/signup";
import DatePicker from 'react-native-datepicker'
import { ImagePicker, Permissions, Constants } from 'expo';
import SwitchSelector from "react-native-switch-selector";
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { sendDataToLogIn, storeToken, getToken, removeToken, storeID } from '../utils/login';
import { editNotifications } from '../utils/editprofile';

export default class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notifications: 'T',
      isLoading: false, //ya
      errors: [],
    };

  }

  home() {
    Actions.home()
  }

  goBack() {
    Actions.pop();
  }

  async Edit() {

    try {

      const { notifications } = this.state;
      if (notifications == true) {

        this.setState({ notifications: true })

      } else if (notifications == false) {

        this.setState({ notifications: false })
      }

      let response = await editNotifications(
        this.state.notifications
      )

      let status = response.status;
      console.log("res status: " + status);

      if (status >= 200 && status < 300) {
        this.setState({ errors: [] })
        console.log("Notificaciones actualizadas");
        this.goBack()

      } else {
        console.log("Notificaciones actualizadas | Error");
        this.setState({ isLoading: false })
      }

    } catch (error) {
      this.setState({ isLoading: false })
      console.log("catch errors: " + error)
    }
  };

  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <View style={styles.container2}>
            <Text style={styles.headling}>ACTUALIZANDO INFO...</Text>
            <ActivityIndicator size="large" color="#00CCFF" />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <View style={styles.notificationsTextCont}>
            <TouchableOpacity style={styles.button}
              onPress={() => this.goBack()}>
              <Text style={styles.signupButton2}>BACK</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>¿Do you want to change notifications?</Text>
          <View style={styles.switch}>
            <SwitchSelector
              initial={0}
              onPress={value => this.setState({ notifications: value })}
              textColor={'#00ccff'} //'#7a44cf'
              selectedColor={'#ffffff'}
              buttonColor={'#00ccff'}
              borderColor={'#00ccff'}
              hasPadding
              options={[
                { label: "YES", value: "1" },
                { label: "NO", value: "0" }
              ]}
            />
          </View>
          <TouchableOpacity style={styles.button}
            onPress={() => this.Edit()}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <View style={styles.signupTextCont}>
            <TouchableOpacity onPress={this.home}>
              <Text style={styles.icons}> HOME </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.home}>
              <Text style={styles.icons}> SEARCH </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#707070',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  notificationsTextCont: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingTop: wp('6%'),
    paddingBottom: wp('3%'),
    marginHorizontal: wp('3%'),
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