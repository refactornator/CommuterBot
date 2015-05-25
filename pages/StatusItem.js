'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var xml2js = require('xml2js');
var pluralize = require('pluralize');
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
    var timeLeft = this.state.nextDepartureIn - this.props.duration;

    return (
      <View style={styles.wrapper}>
        <Text style={[styles.content, styles.header]}>{this.props.title}</Text>
        <StatusCircle ref="status" style={[styles.content, styles.indicator]} />
        <Text style={[styles.content, styles.details]}>You have <Text style={{fontWeight: 'bold'}}>{timeLeft} {pluralize('minute', timeLeft)}</Text> to make the <Text style={{fontWeight: 'bold'}}>{this.props.routeCode}-{this.props.directionTitle}</Text> bus.</Text>
        <Text style={[styles.content, styles.subDetails]}>Departure in {this.state.nextDepartureIn} {pluralize('minute', this.state.nextDepartureIn)} and you are {this.props.duration} {pluralize('minute', this.props.duration)} minutes away.</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  content: {
    width: 200,
    textAlign: 'center'
  },
  header: {
    marginTop: 10,
    marginBottom: 30,
    fontWeight: 'bold',
    fontSize: 14
  },
  indicator: {
    height: 200
  },
  details: {
    marginTop: 40
  },
  subDetails: {
    fontSize: 10,
    marginTop: 10
  },
  wrapper: {
    flex: 1,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    width: width - 40,
    height: height * 0.8,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#ced1d6'
  }
});

module.exports = StatusItem;
