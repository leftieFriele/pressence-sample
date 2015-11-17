var Hapi = require('hapi');
var Inert = require('inert');
var Vision = require('vision');
var HapiReactViews = require('hapi-react-views');

var RoutingContext = require('react-router').RoutingContext;
var routeMatch = require('react-router').match;

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
      console.log('pressence...');
      reply(getUsers().slice(Math.floor(Math.random() * 4)));
    }
  });
  server.ext('onPreResponse', (request, reply) => {
    if (typeof request.response.statusCode !== 'undefined') {
      return reply.continue();
    }

    const location = request.url;
    const routes =  require('../src/react-components/routes.jsx');

    routeMatch({routes, location}, (err, redirectLocation, renderProps) => {
      if (redirectLocation) {
        return reply.redirect(`${redirectLocation.pathname}${redirectLocation.path}`);
      }
      if (err || !renderProps) {
        return reply.continue();
      }
      const InitialComponent = (<RoutingContext {...renderProps} />);
      const componentHtml = React.renderToString(InitialComponent);

      const html = `<html>
      <head>
        <meta charSet="utf-8"/>
        <title>{this.props.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
      </head>
      <body>
        <div id="react-view">${componentHtml}</div>
         <script src="js/pressence.js"></script>
      </body>
      </html>`;
      reply(html);
    })
  });
  /*
  server.route({
    method: 'get',
    path: '/',
    handler: (request, reply) => {
      var ctx = {
        users: getUsers()
      };
      var renderOptions = {
        runtimeOptions: {
          renderMethod: 'renderToString'
        }
      };
      server.render('main', ctx, renderOptions, function(err, appOutput){
        if (err) {
          console.error(err);
        }
        var htmlCtx = {
          children: appOutput,
          state: 'window.state = ' + JSON.stringify(ctx) + ';'
        };
        server.render('layout/default', htmlCtx, renderOptions, function(err, htmlOutput){
          if (err) {
            console.error(err);
          }
          reply(htmlOutput);
        });
      });
    }
  });*/
  server.route({
    method: 'GET',
    path: '/{p*}',
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
