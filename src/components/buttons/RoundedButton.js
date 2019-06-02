import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
Text,
View,
TouchableHighlight,
StyleSheet,
} from 'react-native';
import colors from '../../styles/colors';

export default class RoundedButton extends Component {
	render(){
    const{text, textColor, background, handleOnPress } = this.props;
    const backgroundColor = background||'transparent';
    const color= textColor || colors.black;

		return(
      <TouchableHighlight
       style ={[{backgroundColor}, styles.wrapper]}
       onPress={handleOnPress}
       >
        <Text style={[{color}, styles.buttonText]}>
        {text}
        </Text>
      </TouchableHighlight>
);
	}
}

RoundedButton.PropTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  background: PropTypes.string,
  icon: PropTypes.object,
  handleOnPress: PropTypes.func.isRequired,

};

const styles = StyleSheet.create({
  wrapper:{
    display: 'flex',
    padding: 15,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.width,

  },
  buttonText:{
    fontSize: 17,
    width: '100%',
    textAlign: 'center',
  }
})
