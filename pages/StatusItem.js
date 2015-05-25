'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var xml2js = require('xml2js');
var Dimensions = require('Dimensions');

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

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
  },

  refreshStatus: function() {
    var that = this;

    StatusService.queryForStatus(this.props.agency, this.props.routeCode, this.props.stopCode)
      .then(function(response) {
        xml2js.parseString(response._bodyInit, function (err, result) {
          var minutes = ServiceParser.getNextDepartureTime(result);
          var timeLeft = minutes - that.props.duration;
          while(minutes !== null && timeLeft < 0) {
            minutes = ServiceParser.getNextDepartureTime(result);
            timeLeft = minutes - that.props.duration;
          }

          if(!minutes && timeLeft < 0) {
            return;
          }

          that.setState({nextDepartureIn: minutes});

          if (timeLeft <= 5) {
            that.refs.status.changeColor('#379F55');
          } else if (timeLeft > 5 && timeLeft <= 10) {
            that.refs.status.changeColor('#ffb83f');
          } else if (timeLeft > 10) {
            that.refs.status.changeColor('#ec5252');
          }
        });
      });
  },

  render: function() {
    return (
      <View style={styles.item}>
        <Text style={{marginTop: 10, marginBottom: 30}}>{this.props.title}</Text>
        <StatusCircle ref="status" style={styles.indicator} />
        <Text style={{width: 200, textAlign: 'center', marginTop: 40}}>You have {this.state.nextDepartureIn - this.props.duration} minutes to make the {this.props.routeCode}-{this.props.directionTitle} bus. It leaves in {this.state.nextDepartureIn} minutes and you are {this.props.duration} minutes away.</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  item: {
    flex: 1,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    width: width - 40,
    height: height * 0.8,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#ced1d6'
  },
  indicator: {
    width: 200,
    height: 200
  }
});

module.exports = StatusItem;
