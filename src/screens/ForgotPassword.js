import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import colors from '../styles/colors';
import InputField from '../components/form/InputField';
import Notification from '../components/Notification';
import NextArrowButton from '../components/buttons/NextArrowButton';
import Loader from '../components/Loader';

export default class ForgotPassword extends Component {
  render() {
    return (
      <View>
        <Text> Hello World </Text>
      </View>
    );
  }
}
