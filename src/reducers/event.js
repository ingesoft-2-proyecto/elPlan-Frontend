const initialState = {
  events: [
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
]
};

export default function (state = initialState, action ) {
  return state;
}
