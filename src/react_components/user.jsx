'use strict';

import React from 'react';

import PressenceStatus from './pressence-status.jsx';

const Styles = {
  userlist: {
    listStyle: 'none'
  }
};

class UserList extends React.Component {
  render() {
    console.log('UserList', this.props.users);
    let userlist = [];
    if (this.props.users) {
      userlist = this.props.users.map((user, index) => {
        return (
          <li key={user.id} ><a href={`/user/${user.id}`}>{user.username}</a> <PressenceStatus status={user.online}/></li>
        );
      })
    }
    return (
      <ul style={Styles.userlist}>
        {userlist}
      </ul>
    );
  }
};

class UserInfo extends React.Component {
  render() {
    return (
      <div>
        <b>I am a user {this.props.params.id}!</b>
      </div>
    );
  }
};

export default UserList;
export {UserInfo};
