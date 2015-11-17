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
    let userlist = this.props.users.map((user, index) => {
      return (
        <li key={user.id} ><a href={`/user/${user.id}`}>{user.username}</a> <PressenceStatus status={user.online}/></li>
      );
    })
    return (
      <ul style={Styles.userlist}>
        {userlist}
      </ul>
    );
  }
};

class UserInfo extends React.Component {
  componentDidMount() {
    const userid = this.props.params.id;
    console.log('UserID', userid);
    // retrieve user profile
  };

  render() {
    return (
      <div>
        <b>I am a user!</b>
      </div>
    );
  };
};

export default UserList;
export {UserInfo};
