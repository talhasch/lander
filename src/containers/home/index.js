import React, {Component} from 'react';

import connect from 'react-redux/es/connect/connect';

import {FormattedMessage} from 'react-intl';

import getBaseUrl from '../../utils/get-base-url';

import {injectIntl} from 'react-intl';

import blockstackLogo from '../../images/blockstack-bug-rev.svg'

import landerLogo from '../../images/lander-512.png';

const blockstack = require('blockstack');

class Home extends Component {
  signIn = () => {
    if (blockstack.isUserSignedIn()) {
      const {history} = this.props;
      history.push('/app/editor');
      return;
    }

    const base = getBaseUrl();
    const redir = `${base}/app/auth`;
    const manifest = `${base}/manifest.json`;
    const scope = ['store_write', 'publish_data'];

    blockstack.redirectToSignIn(redir, manifest, scope);
  };

  render() {

    return (
      <div className="home-wrapper">
        <div className="header">
          <img src={landerLogo} width={74} />
        </div>
        <div className="content">
          <div className="showcase">
          </div>
          <div className="text-content">
            <h1 className="main-title"><FormattedMessage id="home.title"/></h1>
            <p className="description"><FormattedMessage id="home.description"/></p>
            <div onClick={this.signIn} className="login-btn">
              <img src={blockstackLogo} className="bl-icon"/> <FormattedMessage id="home.login"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({activeUser}) => ({
  activeUser
});

export default connect(
  mapStateToProps,
  {}
)(injectIntl(Home))