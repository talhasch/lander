import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import store, {history} from './store'
import App from './containers';
import * as serviceWorker from './serviceWorker';

// import App from './containers/app'

import './index.css';
//import 'typeface-roboto';
import './style/style.scss';

window.blockstack = require('blockstack');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();