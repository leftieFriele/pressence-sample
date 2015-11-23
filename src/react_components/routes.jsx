import React from 'react';
import {render} from 'react-dom';
import {Router, IndexRoute, Route, Link} from 'react-router';
import PressenceApp from './pressence-app.jsx';
import PressenceList from './pressence-list.jsx';
import {UserInfo} from './user.jsx';

export default (
  <Route path="/" component={PressenceApp} name="PressenceApp">
    <IndexRoute component={PressenceList}/>
    <Route path="/user/:id" component={UserInfo} />
  </Route>
);
