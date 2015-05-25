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
  AppStateIOS,
  AppRegistry,
  StyleSheet,
  View,
} = React;

var StatusList = require('./pages/StatusList');

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
    // var that = this;

    // var options = {
    //   enableHighAccuracy: true,
    //   timeout: 5000,
    //   maximumAge: 0
    // };

    // function success(pos) {
    //   var crd = pos.coords;

    //   console.log('Your current position is:');
    //   console.log('Latitude : ' + crd.latitude);
    //   console.log('Longitude: ' + crd.longitude);
    //   console.log('More or less ' + crd.accuracy + ' meters.');
    // };

    // function error(err) {
    //   console.warn('ERROR(' + err.code + '): ' + err.message);
    // };

    // navigator.geolocation.getCurrentPosition(success, error, options);
  },

  componentWillUnmount: function() {
    AppStateIOS.removeEventListener('change', this._handleAppStateChange);
  },

  _handleAppStateChange: function(currentAppState) {
    this.setState({ currentAppState, });
    this.forceUpdate();
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ced1d6',
  }
});

AppRegistry.registerComponent('CommuterBot', () => CommuterBot);
