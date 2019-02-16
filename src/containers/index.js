import React, {Component, Fragment} from "react";
import {Route} from "react-router-dom";
import {addLocaleData, IntlProvider} from "react-intl";
import {flattenMessages} from "../utils/flatten-messages";
import messages from "../locales";

import Home from "./home";
import Editor from "./editor";
import Profile from './profile'

import en from 'react-intl/locale-data/en';

addLocaleData([...en]);

export default class App extends Component {
  render() {
    let locale = 'en-US';

    return (
      <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
        <Fragment>
          <Route exact path="/" component={Home}/>
          <Route exact path="/app/auth" component={props => {
            if (window.blockstack.isSignInPending()) {
              window.blockstack.handlePendingSignIn()
                .then(() => {
                  const {history} = props;
                  history.push('/app/editor');
                });
            }
            return null;
          }}/>
          <Route exact path="/app/editor" component={props => {
            // Login check
            if (!window.blockstack.isUserSignedIn()) {
              const {history} = props;
              history.push('/');
              return null;
            }
            return <Editor {...props} />;
          }}/>
          <Route exact path="/:username" component={Profile}/>
        </Fragment>
      </IntlProvider>
    );
  }
}