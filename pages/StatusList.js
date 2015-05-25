'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ScrollView,
} = React;

var haversine = require('haversine-distance');

var StatusItem = require('./StatusItem');

var StatusList = React.createClass({
  render: function() {
    var statusNodes = this.props.data.map(function (status) {
      var distanceInMeters = haversine(this.props.currentLocation, status.location);
      var durationInMinutes =  Math.ceil(distanceInMeters / 1.4 / 60);

      return (
        <StatusItem 
          key={status.id}
          title={status.title}
          agency={status.agency}
          directionTitle={status.directionTitle}
          routeCode={status.routeCode}
          stopCode={status.stopCode}
          location={status.location}
          duration={durationInMinutes}>
        </StatusItem>
      );
    }.bind(this)).filter(function(statusItem) {
      if (statusItem.props.duration <= 30) {
        return true;
      }
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
