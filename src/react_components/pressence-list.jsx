'use strict';

import React from 'react';
import UserList from './user.jsx';

class PressenceList extends React.Component {
  render() {
    return (
      <UserList users={this.props.users}/>
    )
  }
};

export default PressenceList;
