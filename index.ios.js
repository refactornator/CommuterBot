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
