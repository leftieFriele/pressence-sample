'use strict';

import React from 'react';
import PressenceStatus from './pressencestatus.jsx';

let Styles = {
  userlist: {
    'list-style': 'none'
  }
};

class UserList extends React.Component {
  render() {
    let userlist = this.props.users.map((user, index) => {
      return (
        <li key={user.id} >{user.username} <PressenceStatus status={user.online}/></li>
      );
    })
    return (
      <ul style={Styles.userlist}>
        {userlist}
      </ul>
    );
  }
};

module.exports = UserList;
