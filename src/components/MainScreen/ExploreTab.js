
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
import { getSearchEventsPrice } from '../../utils/postSearchPrice';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
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
});

class ExploreTab extends Component {

  componentWillMount(){
    this.props.getSearchEventsPrice();
  }

  onPress(item) {
    this.props.navigate({ routeName: "Detail", params: { item: item } });
  }

  render() {
    const { events } = this.props;
    return (
      <FlatList
        style={styles.container}
        data={ events }
        renderItem={({item}) =>
          <TouchableOpacity onPress={() => this.onPress(item)} style={styles.item}>
            <Image style={styles.image} source = {{uri: item.photo}} />
            <Text style={styles.title}>{`$${item.cost} ${item.name}`}</Text>
          </TouchableOpacity>
        }
        keyExtractor={(item, index) => item.id}
      />
    );
  }
}

const mapStateToProps = state => ({
  events: state.searchPriceReducer.events
});

const mapDispatchToProps = dispatch => ({
  navigate: (route) => dispatch(navigate(route)),
  getSearchEventsPrice: () => dispatch(getSearchEventsPrice()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreTab);
