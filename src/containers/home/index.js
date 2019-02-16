import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

import getBaseUrl from '../../utils/get-base-url';

import {injectIntl} from 'react-intl';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  signIn = () => {

    /*
    if (isSignedIn()) {

      const {history} = this.props;
      history.push('/app/edit');
      return;
    }

    const base = getBaseUrl();
    const redir = `${base}/app/editor`;
    const manifest = `${base}/manifest.json`;
    const scope = ['store_write', 'publish_data'];
    signIn(redir, manifest, scope);
    */

    /*     */
    if (window.blockstack.isUserSignedIn()) {
      const {history} = this.props;
      history.push('/app/editor');
      return;

      /*
      const userData = window.blockstack.loadUserData();
      console.log("signed in");
      console.log(userData);
      return;
      */
    }

    const base = getBaseUrl();
    const redir = `${base}/app/auth`;
    const manifest = `${base}/manifest.json`;
    const scope = ['store_write', 'publish_data'];

    window.blockstack.redirectToSignIn(redir, manifest, scope);
  };

  render() {
    return (
      <div className="home-wrapper">
        <Button onClick={this.signIn}>Sign In</Button>
      </div>)
  }
}


export default injectIntl(Home)