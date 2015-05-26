'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ScrollView,
} = React;

var haversine = require('haversine-distance');

var StatusItem = require('./StatusItem');
var Map = require('./Map');

var StatusList = React.createClass({

  getInitialState: function() {
    return {
      showMap: false
    };
  },

  handleClick: function(index) {
    this.setState({ showMap: !this.state.showMap });
  },

  render: function() {
    if(this.state.showMap) {
      return (
        <Map
          onClick={this.handleClick}
          center={this.props.currentLocation}>
        </Map>
      );
    } else {
      var statusNodes = this.props.data.map(function (status, i) {
        var distanceInMeters = haversine(this.props.currentLocation, status.location);
        var durationInMinutes =  Math.ceil(distanceInMeters / 1.4 / 60);

        var boundClick = this.handleClick.bind(this, i);
        return (
          <StatusItem 
            key={status.id}
            onClick={boundClick} 
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
          style={styles.scrollView}>
          {statusNodes}
        </ScrollView>
      );
    }
  }
});

var styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#6A85B1'
  }
});

module.exports = StatusList;
