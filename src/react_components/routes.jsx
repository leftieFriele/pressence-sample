import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Link} from 'react-router';
import PressenceApp from './pressence-app.jsx';
import {UserInfo} from './user.jsx';

const AppWrapper = React.createClass({
  render: () => {
    return (
      <PressenceApp users={serverState.users} />
    );
  }
});

export default (
  <Router>
    <Route path="/" component={AppWrapper} />
    <Route path="/user/:id" component={UserInfo} />
  </Router>
);
