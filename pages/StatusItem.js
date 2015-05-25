'use strict';

var React = require('react-native');
var {
  AppStateIOS,
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;
var TimerMixin = require('react-timer-mixin');

var xml2js = require('xml2js');
var pluralize = require('pluralize');
var Dimensions = require('Dimensions');

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var StatusCircle = require('../components/StatusCircle');
var StatusService = require('../components/StatusService');
var ServiceParser = require('../components/ServiceParser');

var StatusItem = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      nextDepartureIn: null
    };
  },

  componentDidMount: function() {
    AppStateIOS.addEventListener('change', this._handleAppStateChange);
    this._refreshStatus();
    this._startRefreshInterval();
  },

  componentWillUnmount: function() {
    AppStateIOS.removeEventListener('change', this._handleAppStateChange);
    this._stopRefreshInterval();
  },

  _startRefreshInterval: function() {
    this.interval = this.setInterval(function() {
      this._refreshStatus();
    }.bind(this), 30000);
  },

  _stopRefreshInterval: function() {
    this.clearInterval(this.interval);
  },

  _handleAppStateChange: function(currentAppState) {
    if(currentAppState === 'active') {
      this._refreshStatus();
      this._startRefreshInterval();
    } else {
      this._stopRefreshInterval();
    }
  },

  _refreshStatus: function() {
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
        <Text style={[styles.content, styles.details]}>You{"'"}ve got <Text style={{fontWeight: 'bold'}}>{timeLeft} {pluralize('minute', timeLeft)}</Text> before the <Text style={{fontWeight: 'bold'}}>{this.props.routeCode}-{this.props.directionTitle}</Text> leaves.</Text>
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
    fontSize: 20
  },
  indicator: {
    height: 200
  },
  details: {
    marginTop: 40
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
