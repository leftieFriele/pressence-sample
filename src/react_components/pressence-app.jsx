'use strict';

import React from 'react';
import UserList from './userlist.jsx';

import fetch from 'isomorphic-fetch';

class PressenceApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.users
    };
  }
  componentDidMount() {
    var self = this;
    setTimeout(()=> {
      self.poll();
    }, 7000);
  }
  poll() {
    var self = this;
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
        <UserList users={this.state.users}/>
      </div>
    );
  }
};

module.exports = PressenceApp;
