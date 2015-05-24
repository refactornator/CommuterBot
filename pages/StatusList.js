'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ScrollView,
} = React;

var StatusItem = require('./StatusItem');

var StatusList = React.createClass({
  render: function() {
    var currentLocation = this.props.currentLocation;
    var statusNodes = this.props.data.map(function (status) {
      return (
        <StatusItem 
          key={status.id}
          name={status.name}
          agency={status.agency}
          routeCode={status.routeCode}
          stopCode={status.stopCode}
          location={status.location}
          currentLocation={currentLocation}>
        </StatusItem>
      );
    });
    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        contentInset={{top: 40}}
        style={styles.scrollView}>
        {statusNodes}
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#6A85B1',
    width: 380
  }
});

module.exports = StatusList;
