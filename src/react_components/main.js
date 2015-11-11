'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var PressenceApp = require('./pressence-app.jsx');

var serverState = window.state;
ReactDom.render(
  <PressenceApp users={serverState.users}/>,
  document.getElementById('AppMount')
);
