"use strict";

function getNextDepartureTime(xml) {
  var minutes = null;
  if (xml.hasOwnProperty('body')) {
    if (xml.body.hasOwnProperty('predictions') && xml.body.predictions.length > 0) {
      if (xml.body.predictions[0].hasOwnProperty('direction') && xml.body.predictions[0].direction.length > 0) {
        if (xml.body.predictions[0].direction[0].hasOwnProperty('prediction') && xml.body.predictions[0].direction[0].prediction.length > 0) {
          if (xml.body.predictions[0].direction[0].prediction[0].$.hasOwnProperty('minutes')) {
            minutes = parseInt(xml.body.predictions[0].direction[0].prediction[0].$.minutes, 10);
          }
        }
      }
    }
  }
  
  return minutes;
}

exports.getNextDepartureTime = getNextDepartureTime;
