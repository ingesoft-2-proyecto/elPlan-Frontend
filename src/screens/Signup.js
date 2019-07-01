import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, ActivityIndicator, AsyncStorage, Alert} from 'react-native';
import Logo from '../components/Logo';
import { Actions } from 'react-native-router-flux';
import { validateSignup } from "../utils/validation";
import { sendDataToSignUp } from "../utils/signup";
import DatePicker from 'react-native-datepicker'
import { ImagePicker } from 'expo';
import SwitchSelector from "react-native-switch-selector";
import { moment } from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { sendDataToLogIn, storeToken, getToken, removeToken } from '../utils/login';

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '', //ya
            age: '', //ya
            date: '', //ya
            lastname: '', //ya 
            password: '', //ya
            notifications: '',
            confirmpassword: '', //ya
            email: '', //ya
            isLoading: false, //ya
            isSignup: false, //ya
            error: '', //ya
            imageUri: null,
            imageType: null,
            imageName: null,
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

    async createUser() {

        const now = moment().format("DD-MM-YYYY");

        const birthdate = this.state.date;
        const begin = moment(birthdate).format("DD-MM-YYYY");

        var years = now.diff(begin,'years',false);
        Alert.alert("Ud tiene " + years + " años");

        this.setState(
            {
                age: years
            }
        )
        
        try {

            this.setState({ isLoading: true })

            let response = await sendDataToSignUp(
                this.state.name,
                this.state.lastname,
                this.state.password,
                this.state.confirmpassword,
                this.state.email,
                this.state.age,
                this.state.date,

            )

            let status = response.status;
            console.log("res status: " + status);

            switch (status) {
                case 201:
                    this.setState({ errors: [] })
                    console.log("Nuevo usuario creado");

                    let resToken = await sendDataToLogIn(this.state.email, this.state.password)
                    resToken = await resToken.json()
                    let accessToken = resToken.jwt
                    storeToken(accessToken);
                    console.log("Access Token's Expiration: " + res.exp)
                    console.log("Access Token's User ID: " + res.user_id)
                    console.log("Access Token: " + accessToken)

                    this.setState({ isLoading: false })
                    this.home()

                    break;

                case 422:
                    let res = await response.json();
                    this.setState({ errors: [] })
                    var properties = ["user", "email"];
                    for (var i = 0; i < properties.length; i++) {
                        if (res[properties[i]] != undefined) {
                            console.log(res[properties[i]].toString())
                            this.state.errors.push(res[properties[i]].toString())
                        }
                    }

                    ToastAndroid.show(this.state.errors.join(". \n").concat('.'), ToastAndroid.LONG);
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
        height: hp('45%'),
        width: hp('45%'),
        marginTop: hp('5%'),
        marginBottom: hp('5%'),
        marginRight: wp('3%'),
        marginLeft: wp('3%'),
    }
});