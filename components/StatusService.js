'use strict';

function queryForStatus(agency, routeCode, stopCode) {
  var REQUEST_URL = 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a='+agency+'&r='+routeCode+'&s='+stopCode;

  return fetch(REQUEST_URL)
    .then(function(response) {
      return response;
    });
}

exports.queryForStatus = queryForStatus;
