/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Muni Security Token
 * 68db6183-bae8-4fbf-9030-80a07e6226db
 */
'use strict';

var React = require('react-native');
var {
  AsyncStorage,
  AppStateIOS,
  AppRegistry,
  StyleSheet,
  View,
} = React;

var StatusList = require('./pages/StatusList');

var LATITUDE_KEY = '@UserLocation:latitude';
var LONGITUDE_KEY = '@UserLocation:longitude';

var CommuterBot = React.createClass({
  getInitialState: function() {
    return {
      currentAppState: AppStateIOS.currentState,
      currentLocation: {
        latitude: '37.7847900',
        longitude: '-122.4719830'
      }
    };
  },

  componentDidMount: function() {
    AppStateIOS.addEventListener('change', this._handleAppStateChange);

    AsyncStorage.multiGet([LATITUDE_KEY, LONGITUDE_KEY])
      .then((value) => {
        if (value !== null && (value[0][1] !== null || value[1][1] !== null)){
          var currentLocation = {
            latitude: value[0][1],
            longitude: value[1][1]
          }
          this.setState({currentLocation});
          console.log('Recovered selection from disk: ' + value);
        } else {
          console.log('Initialized with no selection on disk.');
        }
      })
      .catch((error) => console.log('AsyncStorage error: ' + error.message))
      .done();

    this._refreshLocation();
  },

  componentWillUnmount: function() {
    AppStateIOS.removeEventListener('change', this._handleAppStateChange);
  },

  _handleAppStateChange: function(currentAppState) {
    this.setState({ currentAppState, });
    this.forceUpdate();
  },

  _refreshLocation: function() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;
      var value = [[LATITUDE_KEY, crd.latitude.toString()], [LONGITUDE_KEY, crd.longitude.toString()]];

      AsyncStorage.multiSet(value)
        .then(() => console.log('Saved selection to disk: ' + value))
        .catch((error) => console.log('AsyncStorage error: ' + error.message))
        .done();
    };

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  },

  render: function() {
    var data = [{
      id: 1,
      title: 'California St & 12th Ave',
      directionTitle: 'Inbound to Downtown',
      shortDirectionTitle: 'Inbound',
      agency: 'sf-muni',
      routeCode: '1',
      stopCode: '3832',
      location: {
        latitude: '37.7844499',
        longitude: '-122.4711'
      }
    }, {
      id: 2,
      title: 'Sutter St & Mason St',
      directionTitle: 'Outbound to the Richmond District',
      shortDirectionTitle: 'Outbound',
      agency: 'sf-muni',
      routeCode: '2',
      stopCode: '6601',
      location: {
        latitude: '37.78906',
        longitude: '-122.4103199'
      }
    }];

    return (
      <View style={styles.container}>
        <StatusList data={data} currentLocation={this.state.currentLocation} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ced1d6',
  }
});

AppRegistry.registerComponent('CommuterBot', () => CommuterBot);
