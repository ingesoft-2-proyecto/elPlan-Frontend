
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';

import { navigate } from '../../actions/nav';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#10171e',
  },

  item: {
    backgroundColor: '#16212c',
    padding: 20,
    marginBottom: 20,
  },
  image: {
    width: Dimensions.get('window').width - 380,
    height: Dimensions.get('window').width *2/7,
    marginBottom: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#e0245e',
  },

  cost: {
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 5,
    color: 'white',
  },

content: {
  fontWeight: 'bold',
  fontSize: 12,
  marginBottom: 5,
  color: '#8899a6',
},

});



class ExploreTab extends Component {

  onPress(item) {
    this.props.navigate({ routeName: "Event", params: { item: item } });
  }

  render() {
    const { events } = this.props;

    return (
      <FlatList
        style={styles.container}
        data={ events }
        renderItem={({item}) =>
          <TouchableOpacity onPress={() => this.onPress(item)} style={styles.item}>
          <Image style = {styles.image} source = {item.image} />
            <Text style = {styles.title}>{`${item.instant ? '📍' : ''}${item.name} `}</Text>
            <Text style = {styles.cost}>{`${item.instant ? '💲' : ''}${item.cost} ~ ${item.date_of_event}`}</Text>
            <Text style = {styles.content} >{` ${item.address} ~ Bogota D.C`}</Text>
          </TouchableOpacity>
        }
        keyExtractor={(item, index) => item.id}
      />
    );
  }
}

const mapStateToProps = state => ({
events: state.event.events

});

const mapDispatchToProps = dispatch => ({
  navigate: (route) => dispatch(navigate(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreTab);
