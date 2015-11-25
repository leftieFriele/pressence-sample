var Hapi = require('hapi');
var Inert = require('inert');
var Vision = require('vision');
var HapiReactViews = require('hapi-react-views');

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import routes from '../src/react_components/routes.jsx';

var PORT = process.env.PORT || 8000;
var server = new Hapi.Server();

var getUsers = () => {
  return [
    {id: 1, username: 'leftiefriele', email: '...', online: Math.floor(Math.random() * 2)},
    {id: 2, username: 'leif', email: '...', online: Math.floor(Math.random() * 2)},
    {id: 3, username: 'espen', email: '...', online: Math.floor(Math.random() * 2)},
    {id: 4, username: 'kølla', email: '...', online: Math.floor(Math.random() * 2)},
    {id: 5, username: 'puta', email: '...', online: Math.floor(Math.random() * 2)},
  ];
}
server.connection({ port: PORT });
server.register([Inert, Vision], function() {
  server.views({
    engines: {
      jsx: HapiReactViews
    },
    relativeTo: __dirname,
    path: './src/react_components/'
  });
  server.route({
    method: 'get',
    path: '/pressence',
    handler: (req, reply) => {
      reply(getUsers().slice(Math.floor(Math.random() * 4)));
    }
  });
  server.ext('onPreResponse', (request, reply) => {
    if (typeof request.response.statusCode !== 'undefined') {
      return reply.continue();
    }

    const location = request.url;

    match({routes, location}, (err, redirectLocation, renderProps) => {
      if (redirectLocation) {
        return reply.redirect(`${redirectLocation.pathname}${redirectLocation.path}`);
      }
      if (err || !renderProps) {
        return reply.continue();
      }
      const InitialComponent = (<RoutingContext {...renderProps} />);
      const componentHtml =  ReactDOMServer.renderToString(InitialComponent);
      const html = `<html>
      <head>
        <meta charSet="utf-8"/>
        <title>{this.props.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      </head>
      <body>
        <div id="react-view">${componentHtml}</div>
         <script src="js/pressencePoller.js" type="javascript/worker"></script>
         <script src="js/pressence.js"></script>
      </body>
      </html>`;
      return reply(html);
    })
  });

  server.route({
    method: 'GET',
    path: '/{js*}',
    handler: {
      directory: {
        path: './public',
        listing: false,
        index: true
      }
    }
  });

  server.start(function () {
    console.log('Running on port:', PORT);
  });
});
