import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import store, {history} from './store'
import App from './containers';
import * as serviceWorker from './serviceWorker';

import 'typeface-m-plus-rounded-1c';

import './index.css';
import './style/style.scss';

window.blockstack = require('blockstack');

require('./data/bg-images');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App store={store}/>
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();