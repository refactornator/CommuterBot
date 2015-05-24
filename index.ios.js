/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var StatusCircle = require('./components/StatusCircle');

var CommuterBot = React.createClass({
  componentDidMount: function() {
    var that = this;

    setTimeout(function() {
      that.refs.status.changeColor('red');
    }, 2000);

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;

      console.log('Your current position is:');
      console.log('Latitude : ' + crd.latitude);
      console.log('Longitude: ' + crd.longitude);
      console.log('More or less ' + crd.accuracy + ' meters.');
    };

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  },

  render: function() {
    return (
      <View style={styles.container}>
        <StatusCircle ref="status" style={styles.status} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  status: {
    width: 200,
    height: 200
  }
});

AppRegistry.registerComponent('CommuterBot', () => CommuterBot);
