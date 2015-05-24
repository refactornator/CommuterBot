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

var xml2js = require('xml2js');

var StatusCircle = require('./components/StatusCircle');
var ServiceParser = require('./components/ServiceParser');

var API_TOKEN = '68db6183-bae8-4fbf-9030-80a07e6226db';
var AGENCY = 'SF-MUNI';
var ROUTE_CODE = '1';
var ROUTE_DIRECTION_CODE = 'Inbound';
var STOP_CODE = '13832';
var REQUEST_URL = 'http://services.my511.org/Transit2.0/GetNextDeparturesByStopCode.aspx?token=68db6183-bae8-4fbf-9030-80a07e6226db&stopCode=13832';

var CommuterBot = React.createClass({
  getInitialState: function() {
    return {nextDepartureIn: null};
  },

  componentDidMount: function() {
    var that = this;

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

    // navigator.geolocation.getCurrentPosition(success, error, options);

    fetch(REQUEST_URL)
      .then(function(response) {
        xml2js.parseString(response._bodyInit, function (err, result) {
          var nextDepartureIn = ServiceParser.getNextDepartureTime(result, AGENCY, ROUTE_CODE, ROUTE_DIRECTION_CODE, STOP_CODE);
          that.setState({nextDepartureIn: nextDepartureIn});
          if (nextDepartureIn <= 5) {
            that.refs.status.changeColor('#379F55');
          } else if (nextDepartureIn > 5 && nextDepartureIn <= 10) {
            that.refs.status.changeColor('#ffb83f');
          } else if (nextDepartureIn > 10) {
            that.refs.status.changeColor('#ec5252');
          }

          console.log('next departure in:', nextDepartureIn, 'minutes.');
        });
      })
      .done();
  },

  render: function() {
    return (
      <View style={styles.container}>
        <StatusCircle ref="status" style={styles.status} />
        <Text>Next Departure In: {this.state.nextDepartureIn} Minutes</Text>
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
  },
  status: {
    width: 200,
    height: 200
  }
});

AppRegistry.registerComponent('CommuterBot', () => CommuterBot);
