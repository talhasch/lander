import React, {Component, Fragment} from 'react';

import {Route} from 'react-router-dom';

import {userSession} from '../blockstack-config';

import {addLocaleData, IntlProvider} from 'react-intl';

import en from 'react-intl/locale-data/en';

import flattenMessages from '../utils/flatten-messages';

import HomeContainer from './home';
import AuthContainer from './app/auth';
import EditorContainer from './app/editor';
import WelcomeContainer from './app/welcome';
import ProfileContainer from './profile'

import {login, loadProfile} from '../store/user';

import messages from '../locales';

addLocaleData([...en]);

export default class App extends Component {
  constructor(props) {
    super(props);

    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      const {store} = this.props;
      store.dispatch(login(userData));
      store.dispatch(loadProfile());
    }
  }

  render() {
    let locale = 'en-US';

    return (
      <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
        <Fragment>
          <Route exact path="/" component={HomeContainer}/>
          <Route
            exact
            path="/app/auth"
            component={props => (
              <AuthContainer
                timestamp={new Date().toString()}
                {...props}
              />
            )}
          />
          <Route exact path="/app/welcome" component={props => {
            return <WelcomeContainer {...props} />;
          }}/>
          <Route exact path="/app/editor" component={props => {
            return <EditorContainer {...props} />;
          }}/>
          <Route exact path="/:username" component={props => (
            <ProfileContainer
              timestamp={new Date().toString()}
              {...props}
            />
          )}/>
        </Fragment>
      </IntlProvider>
    );
  }
}