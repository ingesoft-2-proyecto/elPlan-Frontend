
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

const items = [
  {
    id : 1,
    name : 'Musica para cine', //title
    date_of_event: '27/07/19', //hometype
    image: {uri: 'https://filarmonicabogota.gov.co/wp-content/uploads/2019/07/Musica-para-cine.png'},
    address: 'Carrera 45 # 26 - 85 Edificio León de Greiff', // bedRoom
    cost: 14000, //price
    instant: true
  },

  {
    id : 2,
    name : 'Concierto de Foo Fighters ', //title
    date_of_event: '01/10/19', //hometype
    image: {uri: 'https://miro.medium.com/max/1350/0*wGPCP2sjYT6bN5nl.jpg'},
    address: 'Carrera 30 y Calle 57', // bedRoom
    cost: 126000, //price
    instant: true
  },

  {
    id : 3,
    name : 'Bodies', //title
    date_of_event: '22/08/19', //hometype
    image: {uri: 'https://media.metrolatam.com/2019/06/05/bodies4143-b514cc263c98d2abba84ce5b6f669799-1200x600.jpg'},
    address: 'Avenida Carrera 15 #124-30', // bedRoom
    cost: 15000, //price
    instant: true
  },
];

class ExploreTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: items
    };
  }

  onPress(item) {
    this.props.navigate({ routeName: "Detail", params: { item: item } });
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.items}
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

});

const mapDispatchToProps = dispatch => ({
  navigate: (route) => dispatch(navigate(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreTab);
