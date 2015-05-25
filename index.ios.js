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
  ActivityIndicatorIOS,
  AsyncStorage,
  AppStateIOS,
  AppRegistry,
  StyleSheet,
  View,
} = React;
var Dimensions = require('Dimensions');

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var StatusList = require('./pages/StatusList');

var LATITUDE_KEY = '@UserLocation:latitude';
var LONGITUDE_KEY = '@UserLocation:longitude';

var CommuterBot = React.createClass({
  getInitialState: function() {
    return {
      currentAppState: AppStateIOS.currentState,
      currentLocation: {
        latitude: '',
        longitude: ''
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
        this._refreshLocation();
      })
      .catch((error) => console.log('AsyncStorage error: ' + error.message))
      .done();
  },

  componentWillUnmount: function() {
    AppStateIOS.removeEventListener('change', this._handleAppStateChange);
  },

  _handleAppStateChange: function(currentAppState) {
    this.setState({ currentAppState, });
  },

  _refreshLocation: function() {
    var that = this;

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;

      var latitude = crd.latitude.toString();
      var longitude = crd.longitude.toString();
      var currentLocation = {
        latitude,
        longitude
      };

      that.setState({currentLocation});

      var value = [[LATITUDE_KEY, crd.latitude.toString()], [LONGITUDE_KEY, crd.longitude.toString()]];

      AsyncStorage.multiSet(value)
        .then(() => console.log('Saved selection to disk: ' + value))
        .catch((error) => console.log('AsyncStorage error: ' + error.message))
        .done();
    };

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
      that._refreshLocation();
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

    var content;
    if (this.state.currentLocation.latitude.length > 0 &&
      this.state.currentLocation.longitude.length > 0) {
      content = <StatusList data={data} currentLocation={this.state.currentLocation} />;
    } else {
      content = <ActivityIndicatorIOS
        animating={true}
        style={{height: height}}
        size="large"/>;
    }

    return (
      <View style={styles.container}>
        {content}
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
