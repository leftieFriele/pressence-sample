'use strict';

import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import routes from './routes.jsx';


const serverState = window.state;
render(<Router children={routes} />, document.getElementById('react-view'));

var worker = new Worker('js/pressencePoller.js');
worker.addEventListener('message', (event) => {
  console.log('Worker said', event.data);
}, false);

worker.postMessage('hello');
