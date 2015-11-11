'use strict';

import React from 'react';

let Styles = {
  online: {
    color: 'green'
  },
  offline: {
    color: 'red'
  }
};

class PressenceStatus extends React.Component {
  render() {
    if (this.props.status > 0) {
      return (<span style={Styles.online}>Online</span>);
    } else {
      return (<span style={Styles.offline}>Offline</span>);
    }
  }
};

module.exports = PressenceStatus;
