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
import { sendDataToEvents } from '../utils/events';

export default class Events extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '', //ya
      borough: '', //ya
      address: '', //ya
      description: '', //ya
      category: '', //ya
      type_of_public: '', //ya
      cost: '0', //ya
      date: '',
      hour: '', //ya
      isLoading: false,
      isSignup: false,
      imageUri: null,
      imageType: null,
      imageName: null,
      errors: [],
      errors2: [],
    };

  }

  home() {
    Actions.home()
  }

  goBack() {
    Actions.pop();
  }

  goForm() {
    this.setState(
      {
        isSignup: true
      }
    )
  }

  pickImage = async () => {

    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log("pickImage | result: ");
    console.log(result);

    if (!result.cancelled) {

      let localUri = result.uri;
      let filename = localUri.split('/').pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let a = this.state.name;
      let b = this.state.lastname;
      let finalName = `${a}_${b}_photo${match[0]}`;

      this.setState({ imageUri: localUri });
      this.setState({ imageType: type });
      this.setState({ imageName: finalName });
    }

  }

  async createUser() {

    let moment = require("moment");
    if ("default" in moment) {
      moment = moment["default"];
    }
    const { date } = this.state;
    const eventdate = moment(date, "YYYY-MM-DD HH:mm:ss");
    const eventdate2 = eventdate.format("YYYY-MM-DD HH:mm:ss UTC");

    await this.setState(
      {
        hour: eventdate2
      }
    );

    try {

      let photo = {
        uri: this.state.imageUri,
        type: this.state.imageType,
        name: this.state.imageName,
      }
      let formdata = new FormData();
      formdata.append('photo', photo)

      this.setState(
        {
          isLoading: true
        }
      )

      const { cost } = this.state;
      let numeric_cost = Number(cost);
      await this.setState({ cost: numeric_cost });

      let response = await sendDataToEvents(
        this.state.name,
        this.state.description,
        this.state.cost,
        this.state.borough,
        this.state.address,
        this.state.type_of_public,
        this.state.category,
        this.state.hour,
      )

      let status = response.status;
      console.log("res status: " + status);
      let res = await response.json();
      let event_id = res.id

      if (status >= 200 && status < 300) {
        this.setState({ errors: [] })
        Alert.alert("Nuevo evento creado :) GRACIAS")
  
        try {

          let responsepicture = await sendPictureToEvents(formdata, event_id)
          let statuspicture = responsepicture.status;
          console.log("res picture status: " + statuspicture);

          if (statuspicture >= 200 && statuspicture < 300) {

            this.setState({ errors2: [] })
            console.log("Foto de evento subida");
            this.setState({ isLoading: false })
            this.home()

          } else {

            let respicture = await responsepicture.json();
            this.setState({ errors2: [] })
            var propertiespicture = ["photo"];
            for (var i = 0; i < propertiespicture.length; i++) {
              if (respicture[propertiespicture[i]] != undefined) {
                console.log(respicture[propertiespicture[i]].toString())
                this.state.errors.push(respicture[propertiespicture[i]].toString())
              }
            }

            console.log(this.state.errors2.join(". \n").concat('.'));
            this.setState({ isLoading: false })

          }

        } catch (error) {

          this.setState({ isLoading: false })
          console.log("catch errors: " + error)
        }

      } else {

        console.log("Error creando evento")
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
            <Text style={styles.headling}>CREANDO EVENTO...</Text>
            <ActivityIndicator size="large" color="#00CCFF" />
          </View>
        </View>
      );
    }
    if (this.state.isSignup == false) {
      return (
        <View style={styles.container}>
          <View style={styles.notificationsTextCont}>
            <TouchableOpacity
              onPress={() => this.goBack()}>
              <Text style={styles.signupButton2}>BACK</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container2}>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Name"
              maxLength={100}
              placeholderTextColor="#ffffff"
              selectionColor="#fff"
              keyboardType="default"
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
            />
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Description"
              maxLength={100}
              placeholderTextColor="#ffffff"
              selectionColor="#fff"
              keyboardType="default"
              multiline = { true }
              numberOfLines = { 4 }
              onChangeText={(description) => this.setState({ description })}
              value={this.state.description}
            />
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Cost"
              maxLength={100}
              placeholderTextColor="#ffffff"
              selectionColor="#fff"
              keyboardType="number-pad"
              onChangeText={(cost) => this.setState({ cost })}
              value={this.state.cost}
            />
            <TouchableOpacity style={styles.button}
              onPress={() => this.goForm()}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.notificationsTextCont}>
            <TouchableOpacity
              onPress={() => this.home()}>
              <Text style={styles.signupButton2}>BACK</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container2}>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Borough"
              maxLength={100}
              placeholderTextColor="#ffffff"
              selectionColor="#fff"
              keyboardType="default"
              onChangeText={(borough) => this.setState({ borough })}
              value={this.state.borough}
            />
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Address"
              maxLength={100}
              placeholderTextColor="#ffffff"
              selectionColor="#fff"
              keyboardType="default"
              onChangeText={(address) => this.setState({ address })}
              value={this.state.address}
            />
            <Text style={styles.text}>¿What kind of public?</Text>
            <View style={styles.switch}>
              <SwitchSelector
                initial={0}
                onPress={value => this.setState({ type_of_public: value })}
                textColor={'#00ccff'} //'#7a44cf'
                selectedColor={'#ffffff'}
                buttonColor={'#00ccff'}
                borderColor={'#00ccff'}
                hasPadding
                options={[
                  { label: "KIDS", value: "Niños" },
                  { label: "ADULTS", value: "Adultos" },
                  { label: "FAMILY", value: "Familia" }
                ]}
              />
            </View>
            <Text style={styles.text}>¿What kind of Category?</Text>
            <View style={styles.switch}>
              <SwitchSelector
                initial={0}
                onPress={value => this.setState({ category: value })}
                textColor={'#00ccff'} //'#7a44cf'
                selectedColor={'#ffffff'}
                buttonColor={'#00ccff'}
                borderColor={'#00ccff'}
                hasPadding
                options={[
                  { label: "THEATER", value: "Teatro" },
                  { label: "SPORTS", value: "Deportes" },
                  { label: "CONCERTS", value: "Conciertos" },
                  { label: "FAMILY", value: "Familia" },
                  { label: "ACADEMIC", value: "Academico" },
                ]}
              />
            </View>
            <View style={styles.datepicker}>
              <DatePicker
                style={{ width: 200 }}
                date={this.state.date}
                mode="date"
                placeholder="Select Event Date"
                format="YYYY-MM-DD HH:mm:ss"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(date) => { this.setState({ date: date }) }}
              />
            </View>
            <TouchableOpacity style={styles.button}
              onPress={this.pickImage.bind(this)}>
              <Text style={styles.buttonText}>Upload Picture</Text>
            </TouchableOpacity>
            <View style={styles.uploadImageContainer}>
              <Image source={{ uri: this.state.imageUri }} style={styles.uploadImage} />
            </View>
            <TouchableOpacity style={styles.button}
              onPress={() => this.createUser()}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
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
  signupButton2: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '500'
  },
});