'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  TouchableOpacity,
  AsyncStorage,
  AppStateIOS,
  AppRegistry,
  StyleSheet,
  View,
  Text
} = React;
var MapboxGLMap = require('react-native-mapbox-gl');

var Map = React.createClass({
  mixins: [MapboxGLMap.Mixin],

  getInitialState() {
    return {
      center: this.props.center,
      zoom: 12,
      annotations: [
        {tag: '3832', title: 'California St & 12th Ave', latitude: '37.7844499', longitude: '-122.4711'},
        {tag: '3830', title: 'California St & 10th Ave', latitude: '37.7845499', longitude: '-122.46896'},
        {tag: '3827', title: 'California St & 8th Ave', latitude: '37.7846299', longitude: '-122.46682'},
        {tag: '3825', title: 'California St & 6th Ave', latitude: '37.7848999', longitude: '-122.46471'},
        {tag: '3823', title: 'California St & 4th Ave', latitude: '37.78518', longitude: '-122.4625699'},
        {tag: '3846', title: 'California St & Arguello Blvd', latitude: '37.78566', longitude: '-122.4590399'},
        {tag: '3853', title: 'California St & Cherry St', latitude: '37.78597', longitude: '-122.4563299'},
        {tag: '3897', title: 'California St & Spruce St', latitude: '37.7863299', longitude: '-122.45352'},
        {tag: '3876', title: 'California St & Laurel St', latitude: '37.7867099', longitude: '-122.45026'},
        {tag: '3893', title: 'California St & Presidio Ave', latitude: '37.7871499', longitude: '-122.44688'},
        {tag: '3848', title: 'California St & Baker St', latitude: '37.7876199', longitude: '-122.44338'},
        {tag: '3859', title: 'California St & Divisadero St', latitude: '37.7879499', longitude: '-122.44072'},
        {tag: '3885', title: 'California St & Pierce St', latitude: '37.7884599', longitude: '-122.43681'},
        {tag: '6489', title: 'Steiner St & Sacramento St', latitude: '37.78933', longitude: '-122.43556'},
        {tag: '6296', title: 'Sacramento St & Fillmore St', latitude: '37.7898399', longitude: '-122.43367'},
        {tag: '6320', title: 'Sacramento St & Webster St', latitude: '37.78999', longitude: '-122.4324999'},
        {tag: '6292', title: 'Sacramento St & Buchanan St', latitude: '37.7901899', longitude: '-122.43085'},
        {tag: '6306', title: 'Sacramento St & Laguna St', latitude: '37.7903599', longitude: '-122.42918'},
        {tag: '6310', title: 'Sacramento St & Octavia St', latitude: '37.7906799', longitude: '-122.42714'},
        {tag: '4905', title: 'Gough St & Sacramento St', latitude: '37.7910399', longitude: '-122.42577'},
        {tag: '4016', title: 'Clay St & Franklin St', latitude: '37.7919099', longitude: '-122.42446'},
        {tag: '4031', title: 'Clay St & Van Ness Ave', latitude: '37.7921099', longitude: '-122.42291'},
        {tag: '4026', title: 'Clay St & Polk St', latitude: '37.7923899', longitude: '-122.42071'},
        {tag: '4022', title: 'Clay St & Larkin St', latitude: '37.7925299', longitude: '-122.41959'},
        {tag: '4019', title: 'Clay St & Hyde St', latitude: '37.79276', longitude: '-122.4178999'},
        {tag: '4023', title: 'Clay St & Leavenworth St', latitude: '37.79296', longitude: '-122.4162999'},
        {tag: '4020', title: 'Clay St & Jones St', latitude: '37.7931699', longitude: '-122.41462'},
        {tag: '4030', title: 'Clay St & Taylor St', latitude: '37.79336', longitude: '-122.4127399'},
        {tag: '4024', title: 'Clay St & Mason St', latitude: '37.79365', longitude: '-122.4108199'},
        {tag: '4027', title: 'Clay St & Powell St', latitude: '37.7937899', longitude: '-122.40977'},
        {tag: '4029', title: 'Clay St & Stockton St', latitude: '37.7940799', longitude: '-122.40756'},
        {tag: '4018', title: 'Clay St & Grant Ave', latitude: '37.7942599', longitude: '-122.40597'},
        {tag: '4021', title: 'Clay St & Kearny St', latitude: '37.79448', longitude: '-122.4044099'},
        {tag: '4025', title: 'Clay St & Montgomery St', latitude: '37.7946799', longitude: '-122.40277'},
        {tag: '4028', title: 'Clay St & Sansome St', latitude: '37.7948199', longitude: '-122.40112'},
        {tag: '4017', title: 'Clay St & Front St', latitude: '37.7951', longitude: '-122.3990199'},
        {tag: '34015', title: 'Clay St & Drumm St', latitude: '37.7954199', longitude: '-122.397'},
      ]
    }
  },
  onChange(e) {
    this.setState({ currentZoom: e.zoom });
  },
  onUpdateUserLocation(location) {
    console.log(location)
  },
  onOpenAnnotation(annotation) {
    console.log(annotation)
  },
  render: function() {
    var mapRef = 'mapRef';
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={this.props.onClick} style={styles.header}>
          <Text style={{textAlign: 'center'}}>Close</Text>
        </TouchableOpacity>
         <MapboxGLMap
           style={styles.map}
           showsUserLocation={true}
           ref={mapRef}
           accessToken={'pk.eyJ1Ijoid2xpbmRuZXIiLCJhIjoiZ2hZN0xRWSJ9.LSKXvPsb_yuJAQPKLCya9A'}
           styleURL={'asset://styles/mapbox-streets-v7.json'}
           centerCoordinate={this.state.center}
           zoomLevel={this.state.zoom}
           onRegionChange={this.onChange}
           annotations={this.state.annotations}
           onOpenAnnotation={this.onOpenAnnotation}
           onUpdateUserLocation={this.onUpdateUserLocation}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  header: {
    height: 30
  },
  map: {
    flex: 1,
  }
});

module.exports = Map;
