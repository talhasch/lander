import React, {Component} from 'react';

import connect from 'react-redux/es/connect/connect';

import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';

import getBaseUrl from '../../utils/get-base-url';

import {injectIntl} from 'react-intl';

import blockstackLogo from '../../images/blockstack-bug-rev.svg'

import landerLogo from '../../images/lander-512.png';

import bitey from '../../images/bitey.jpg';

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
      <>
        <div className="product-hunt">
          <a href="https://www.producthunt.com/posts/lander-2" target="_blank" rel="noopener noreferrer">
            <span role="img" aria-label="tada">🎉</span> Lander is live on Product Hunt. Come and join the discussion.
          </a>
        </div>
        <div className="home-wrapper">
          <div className="header">
            <img src={landerLogo} alt="Logo" width={74}/>
          </div>
          <div className="content">
            <div className="showcase">
              <div className="showcase-header">
                <div className="address-bar">
                  https://landr.me/mrbitey.id
                </div>
              </div>
              <div className="showcase-content">
                <img src={bitey} alt="Mr. Bitey"/>
              </div>
            </div>
            <div className="text-content">
              <h1 className="main-title"><FormattedMessage id="home.title"/></h1>
              <p className="description"><FormattedMessage id="home.description"/></p>
              <div onClick={this.signIn} className="login-btn">
                <img src={blockstackLogo} alt="Blockstack Logo" className="bl-icon"/> <FormattedMessage
                id="home.login"/>
              </div>
              <p className="contact">
                <FormattedHTMLMessage id="home.contact" values={{link: 'https://landr.me/lander.id.blockstack'}}/>
              </p>
            </div>
          </div>
        </div>
      </>
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