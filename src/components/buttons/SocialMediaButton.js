import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
}  from 'react-native';
import colors from '../../styles/colors';


export default class SocialMediaButton extends Component {
  render(){
    const{ background, icon, handleOnPress } = this.props;
    const backgroundColor = background||'transparent';

    return(
      <TouchableHighlight
       style ={[{backgroundColor}, styles.wrapper]}
       onPress={handleOnPress}
       >
       <View>
       {icon}

      </View>
      </TouchableHighlight>
);
  }
}

SocialMediaButton.PropTypes = {
  background: PropTypes.string,
  icon: PropTypes.object,
  handleOnPress: PropTypes.func.isRequired,

};


const styles = StyleSheet.create({
  wrapper:{
    display: 'flex',
    padding: 5,
    borderRadius: 4,
    width: 60,
    height: 60,
    overflow: 'hidden',
    

  }

})
