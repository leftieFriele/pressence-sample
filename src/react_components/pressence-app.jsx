'use strict';

import fetch from 'isomorphic-fetch';
import React from 'react';
import {Router, Route, Link} from 'react-router';

import PressenceList from './pressence-list.jsx';

class PressenceApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.users
    };
  }
  componentDidMount() {
    let self = this;
    setTimeout(()=> {
      self.poll();
    }, 7000);
  }
  poll() {
    let self = this;
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    fetch('http://localhost:8000/pressence', {
      method: 'get',
      headers: headers
    })
    .then(
      (response) => {
        response.json().then((data) => {
          this.setState({users: data});
          setTimeout(()=>{
            self.poll();
          }, 7000);
        });
      }
    ).catch((err) => {
      console.log('Fetch error', err);
    });
  }
  render() {
    return (
      <div>
        <h1>Users:</h1>
        <PressenceList users={this.state.users} />
      </div>
    );
  }
};

module.exports = PressenceApp;
