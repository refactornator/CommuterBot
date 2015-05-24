"use strict";

function getNextDepartureTime(xml, agencyName, routeCode, routeDirectionCode, stopCode) {
  var Agency = xml.RTT.AgencyList[0].Agency.filter(function(AgencyItem) {
    if (AgencyItem.$.Name === agencyName) {
      return true;
    }
  })[0];

  var Route = Agency.RouteList[0].Route.filter(function(RouteItem) {
    if (RouteItem.$.Code === routeCode) {
      return true;
    }
  })[0];

  var RouteDirection = Route.RouteDirectionList[0].RouteDirection.filter(function(RouteDirectionItem) {
    if (RouteDirectionItem.$.Code === routeDirectionCode) {
      return true;
    }
  })[0];

  var Stop = RouteDirection.StopList[0].Stop.filter(function(StopItem) {
    if (StopItem.$.StopCode === stopCode) {
      return true;
    }
  })[0];

  if (Stop.DepartureTimeList[0].hasOwnProperty('DepartureTime')) {
    console.log('yay, it worked');
    return Stop.DepartureTimeList[0].DepartureTime[0];
  } else {
    console.log('slow down there, Turbo.');
    return null;
  }
}

exports.getNextDepartureTime = getNextDepartureTime;
