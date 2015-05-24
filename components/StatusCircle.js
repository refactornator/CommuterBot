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

/**
 * An animated SVG component.
 */
var StatusCircle = React.createClass({
  /**
   * Initialize state members.
   */
  getInitialState: function() {
    return {};
  },
  /**
   * When the component is mounted into the document - this is similar to a
   * constructor, but invoked when the instance is actually mounted into the
   * document. Here's, we'll just set up an animation loop that invokes our
   * method. Binding of `this.onTick` is not needed because all React methods
   * are automatically bound before being mounted.
   */
  componentDidMount: function() {
    this._interval = window.setInterval(this.onTick, 20);
  },
  componentWillUnmount: function() {
    window.clearInterval(this._interval);
  },
  onTick: function() {
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
        <Shape fill="#27e833" d={BG_PATH} />
      </Surface>
    );
  }
});

var BG_PATH = "M0,100a100,100 0 1,0 200,0a100,100 0 1,0 -200,0";

module.exports = StatusCircle;