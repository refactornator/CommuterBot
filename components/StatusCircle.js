"use strict";

var React = require('react-native');
var ReactArt = require('ReactNativeART');

var {
    Art,
    TouchableWithoutFeedback
} = React;

var {
    Shape,
    Surface,
    Text
} = ReactArt;

var chroma = require('chroma-js');

/**
 * An animated SVG component.
 */
var StatusCircle = React.createClass({
  /**
   * Initialize state members.
   */
  getInitialState: function() {
    return {color: this.props.color || '#27e833', duration: this.props.duration || 250};
  },
  /**
   * When the component is mounted into the document - this is similar to a
   * constructor, but invoked when the instance is actually mounted into the
   * document. Here's, we'll just set up an animation loop that invokes our
   * method. Binding of `this.onTick` is not needed because all React methods
   * are automatically bound before being mounted.
   */
  componentDidMount: function() {
  },
  componentWillUnmount: function() {
    window.clearInterval(this._interval);
  },
  changeColor: function(newColor) {
    var currentColor = this.state.color;
    var start = new Date().getTime();
    var end = start + this.state.duration;
    this._interval = window.setInterval(this.onTick.bind(null, start, end, currentColor, newColor), 20);
  },
  onTick: function(start, end, currentColor, newColor) {
    var now = new Date().getTime();
    var progress;
    
    if (now > end) {
      window.clearInterval(this._interval);

      progress = 1;
    } else {
      progress = (now - start) / (end - start);
    }

    var color = chroma.interpolate(currentColor, newColor, progress, 'lab').hex();
    this.setState({color: color});
  },
  /**
   * This is the "main" method for any component. The React API allows you to
   * describe the structure of your UI component at *any* point in time.
   */
  render: function() {
    return (
      <Surface
        width={200}
        height={200}>
        <Shape fill={this.state.color} d={BG_PATH} />
      </Surface>
    );
  }
});

var BG_PATH = "M0,100a100,100 0 1,0 200,0a100,100 0 1,0 -200,0";

module.exports = StatusCircle;