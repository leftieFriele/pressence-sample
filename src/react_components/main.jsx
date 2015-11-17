'use strict';

import React from 'react';
import {render} from 'react-dom';
/*import {Router, Route, Link} from 'react-router';
import PressenceApp from './pressence-app.jsx';
import {UserInfo} from './user.jsx';
*/
const serverState = window.state;
/*
const AppWrapper = React.createClass({
  render: () => {
    return (
      <PressenceApp users={serverState.users} />
    );
  }
});
*/
import routes from './routes.jsx';
/*
const routes = (
  <Router>
    <Route path="/" component={AppWrapper} />
    <Route path="/user/:id" component={UserInfo} />
  </Router>
);
*/
render(routes, document.getElementById('AppMount'));
