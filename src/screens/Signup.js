import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, ActivityIndicator, AsyncStorage, Alert} from 'react-native';
import Logo from '../components/Logo';
import { Actions } from 'react-native-router-flux';
import { validateSignup } from "../utils/validation";
import { sendDataToSignUp, sendPictureToSignUp } from "../utils/signup";
import DatePicker from 'react-native-datepicker'
import { ImagePicker, Permissions, Constants } from 'expo';
import SwitchSelector from "react-native-switch-selector";
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { sendDataToLogIn, storeToken, getToken, removeToken } from '../utils/login';

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '', //ya
            age: 0, //ya
            date: '', //ya
            lastname: '', //ya 
            password: '123456789', //ya
            notifications: 'T',
            confirmpassword: '123456789', //ya
            email: 'prueba@gmail.com', //ya
            isLoading: false, //ya
            isSignup: false, //ya
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
        if (validateSignup(this.state.password, this.state.confirmpassword, this.state.email)) {
            this.setState(
                {
                    isSignup: true
                }
            )
        }
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
        const now = moment();
        
        const { date } = this.state;
        const birthdate = moment(date, "DD-MM-YYYY");
      
        const years = now.diff(birthdate, 'years', false);

        await this.setState(
            {
                age: years
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

            const { notifications } = this.state;
            if (notifications == true) {
                
                this.setState({ notifications: true })

            } else if (notifications == false) {
                
                this.setState({ notifications: false })
            }

            let response = await sendDataToSignUp(
                this.state.name,
                this.state.lastname,
                this.state.password,
                this.state.confirmpassword,
                this.state.email,
                this.state.age,
                this.state.date,
                this.state.notifications
            )

            let status = response.status;
            console.log("res status: " + status);

            switch (status) {
                case 201:

                    this.setState({ errors: [] })
                    console.log("Nuevo usuario creado");

                    let resToken = await sendDataToLogIn(this.state.email, this.state.password)
                    let reslogin = await resToken.json();
                    let accessToken = reslogin.token
                    storeToken(accessToken);
                    console.log("Access Token's Expiration: " + reslogin.exp)
                    console.log("Access Token's User ID: " + reslogin.user_id)

                    try {

                        let responsepicture = await sendPictureToSignUp(formdata, reslogin.user_id)
                        let statuspicture = responsepicture.status;
                        console.log("res picture status: " + statuspicture);

                        if (response.status >= 200 && response.status < 300) {
                            
                            this.setState({ errors2: [] })
                            console.log("Foto de perfil subida");
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

                case 422:

                    let res = await response.json();
                    this.setState({ errors: [] })
                    var properties = ["name", "surname", "email", "password", "age", "password_confirmation"];
                    for (var i = 0; i < properties.length; i++) {
                        if (res[properties[i]] != undefined) {
                            console.log(res[properties[i]].toString())
                            this.state.errors.push(res[properties[i]].toString())
                        }
                    }

                    console.log(this.state.errors.join(". \n").concat('.'));
                    this.setState({ isLoading: false })
                    break;

                default:
                    break;
            }

        } catch (error) {
            this.setState({ isLoading: false })
            console.log("catch errors: " + error)
        }
    };

    render() {

        if (this.state.isLoading) {
            return (
                <View>
                    <View style={styles.container}>
                        <Text style={styles.headling}>REGISTRANDO...</Text>
                        <ActivityIndicator size="large" color="#00CCFF" />
                    </View>
                </View>
            );
        }
        if (this.state.isSignup == false) {
            return (
                <View style={styles.container}>
                    <Logo />
                    <View style={styles.container2}>
                        <TextInput style={styles.inputBox}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholder="Email Address"
                            maxLength={100}
                            placeholderTextColor="#ffffff"
                            selectionColor="#fff"
                            keyboardType="email-address"
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                        />
                        <TextInput style={styles.inputBox}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor="#ffffff"
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                        />
                        <TextInput style={styles.inputBox}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            placeholderTextColor="#ffffff"
                            onChangeText={(confirmpassword) => this.setState({ confirmpassword })}
                            value={this.state.confirmpassword}
                        />
                        <TouchableOpacity style={styles.button}
                            onPress={() => this.goForm()}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signupTextCont}>
                        <Text style={styles.signupText}>¿Posees una cuenta?</Text>
                        <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}> LOGIN </Text></TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.container2}>
                        <TextInput style={styles.inputBox}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholder="Name"
                            maxLength={100}
                            placeholderTextColor="#ffffff"
                            selectionColor="#fff"
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name}
                        />
                        <TextInput style={styles.inputBox}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholder="Last Name"
                            maxLength={100}
                            placeholderTextColor="#ffffff"
                            selectionColor="#fff"
                            onChangeText={(lastname) => this.setState({ lastname })}
                            value={this.state.lastname}
                        />
                        <View style={styles.datepicker}>
                            <DatePicker
                                style={{ width: 200 }}
                                date={this.state.date}
                                mode="date"
                                placeholder="Select Birthdate"
                                format="DD-MM-YYYY"
                                minDate="01-01-1900"
                                maxDate="31-12-2200"
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
                        <Text style={styles.text}>¿Do you want to receive notifications?</Text>
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
});