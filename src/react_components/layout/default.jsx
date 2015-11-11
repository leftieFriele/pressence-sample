'use strict';
var React = require('react');

var Styles = {
  mainContainer: {
    height: '100%'
  }
};
var Component = React.createClass({
  render: function(){
    return (
      <html>
      <head>
        <meta charSet="utf-8"/>
        <title>{this.props.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      </head>
      <body>
         <div id="AppMount" style={Styles.mainContainer} dangerouslySetInnerHTML={{ __html: this.props.children }}></div>
         <script id="AppState"
          dangerouslySetInnerHTML={{ __html: this.props.state }}>
         </script>
         <script src="js/pressence.js"></script>
      </body>
      </html>
    );
  }
});

module.exports = Component;
