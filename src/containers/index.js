import React, {Component, Fragment} from "react";
import {Route} from "react-router-dom";
import {addLocaleData, IntlProvider} from "react-intl";
import {flattenMessages} from "../utils/flatten-messages";
import messages from "../locales";

import Home from "./home";
import Editor from "./editor";
import Profile from './profile'

import en from "react-intl/locale-data/en";

addLocaleData([...en]);

export default class App extends Component {
  render() {
    let locale = 'en-US';

    return (
      <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
        <Fragment>
          <Route exact path="/" component={Home}/>
          <Route exact path="/app/editor" component={props => {

            // login check
            /*
            const {history} = props;
            history.push('/');
            return '';
            */
            return <Editor {...props} />;
          }}/>
          <Route exact path="/:username" component={Profile}/>
        </Fragment>
      </IntlProvider>
    );
  }
}