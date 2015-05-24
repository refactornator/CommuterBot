'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var xml2js = require('xml2js');
var haversine = require('haversine-distance')

var StatusCircle = require('../components/StatusCircle');
var StatusService = require('../components/StatusService');
var ServiceParser = require('../components/ServiceParser');

var StatusItem = React.createClass({
  getInitialState: function() {
    return {
      nextDepartureIn: null
    };
  },

  componentDidMount: function() {
    this.refreshStatus();
    console.log(this.props.currentLocation);
  },

  refreshStatus: function() {
    var that = this;

    StatusService.queryForStatus(this.props.agency, this.props.routeCode, this.props.stopCode)
      .then(function(response) {
        xml2js.parseString(response._bodyInit, function (err, result) {
          var minutes = ServiceParser.getNextDepartureTime(result);
          that.setState({nextDepartureIn: minutes});
          console.log('next departure in:', minutes, 'minutes.');

          if (minutes <= 5) {
            that.refs.status.changeColor('#379F55');
          } else if (minutes > 5 && minutes <= 10) {
            that.refs.status.changeColor('#ffb83f');
          } else if (minutes > 10) {
            that.refs.status.changeColor('#ec5252');
          }
        });
      });
  },

  render: function() {
    var distanceInMeters = haversine(this.props.currentLocation, this.props.location);
    console.log(distanceInMeters);
    var duration =  Math.ceil(distanceInMeters / 1.4 / 60);

    return (
      <View style={styles.item}>
        <Text style={{marginBottom: 50}}>{this.props.name}</Text>
        <StatusCircle ref="status" style={styles.indicator} />
        <Text style={{width: 200, textAlign: 'center', marginTop: 50}}>You are {duration} minutes from the bus stop, and the bus leaves in {this.state.nextDepartureIn} minutes.</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ced1d6',
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    width: 320,
    height: 400,
    borderRadius: 5
  },
  indicator: {
    width: 200,
    height: 200,
    marginTop: 50,
    marginBottom: 50
  }
});

module.exports = StatusItem;
