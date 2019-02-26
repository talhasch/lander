import React, {Component, Fragment} from 'react';
import {Route} from 'react-router-dom';

import {addLocaleData, IntlProvider} from 'react-intl';

import en from 'react-intl/locale-data/en';

import {flattenMessages} from '../utils/flatten-messages';

import Home from './home';
import Auth from './auth';
import Editor from './editor';
import Profile from './profile'

import {login} from '../store/user';

import messages from '../locales';

const blockstack = require('blockstack');

addLocaleData([...en]);

export default class App extends Component {
  constructor(props) {
    super(props);

    if (blockstack.isUserSignedIn()) {
      const userData = blockstack.loadUserData();
      const {store} = this.props;
      store.dispatch(login(userData));
    }
  }

  render() {
    let locale = 'en-US';

    return (
      <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
        <Fragment>
          <Route exact path="/" component={Home}/>
          <Route
            exact
            path="/app/auth"
            component={props => (
              <Auth
                timestamp={new Date().toString()}
                {...props}
              />
            )}
          />
          <Route exact path="/app/editor" component={props => {
            return <Editor {...props} />;
          }}/>
          <Route exact path="/:username" component={props => (
            <Profile
              timestamp={new Date().toString()}
              {...props}
            />
          )}/>
        </Fragment>
      </IntlProvider>
    );
  }
}