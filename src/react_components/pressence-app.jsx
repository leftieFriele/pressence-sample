'use strict';

import React from 'react';

class PressenceApp extends React.Component {
  render() {
    console.log('App children:', this.props.children);
    return (
      <div>
        <h1>Users:</h1>
        {this.props.children}
      </div>
    );
  }
};

PressenceApp.propTypes = {
  children: React.PropTypes.object
};

export default PressenceApp;
