'use strict';

import React from 'react';
import fetch from 'isomorphic-fetch';

import UserList from './user.jsx';

class PressenceList extends React.Component {
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
    console.log('Render list', this.state.users);
    return (
      <UserList users={this.state.users}/>
    )
  }
};

export default PressenceList;
