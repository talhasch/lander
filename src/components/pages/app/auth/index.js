/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import {User} from 'radiks-patch';

import {userSession, getUsername, getUserAppBucketUrl} from '../../../../blockstack-config';

import isRealUsername from '../../../../helper/is-real-username';

import {UserBucketUrl} from '../../../../model';

import logoImg from '../../../../images/lander-512.png'

const registerUserBucketUrl = async () => {
  const docs = await UserBucketUrl.fetchOwnList({sort: 'createdAt'});
  const newAttrs = {
    username: getUsername(),
    url: getUserAppBucketUrl()
  };

  if (docs.length > 0) {
    const [doc,] = docs;
    doc.update(newAttrs);
    await doc.save();
    return;
  }

  const doc = new UserBucketUrl(newAttrs);
  await doc.save();
};

class AuthPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: null
    }
  }

  componentDidMount() {
    fetch('/reserved-user-names.json')
      .then(r => r.json())
      .then(d => {
        window._reservedUsersNames = d;

        return this.doAuth();
      });
  }

  doAuth = async () => {
    const {history} = this.props;

    if (userSession.isSignInPending()) {

      let userData;
      try {
        userData = await userSession.handlePendingSignIn();
        await User.createWithCurrentUser();
      } catch (e) {
        this.setState(({error: true}));
        return;
      }

      if (userData) {
        const {login} = this.props;
        const username = getUsername();

        const _userData = Object.assign({}, userData, {username});

        // Register bucket urls for non-username accounts
        if (!isRealUsername(username)) {
          await registerUserBucketUrl();
        }

        login(_userData);
        history.push('/app/editor');
        return;
      }

      this.setState(({error: true}));
    }
  };

  signIn = (e) => {
    e.preventDefault();

    userSession.signUserOut();
    userSession.redirectToSignIn();
  };

  render() {
    const {error} = this.state;

    if (error) {
      return <div className="auth-error">
        <p><strong>Sorry :(</strong></p>
        <p>Something went wrong.</p>
        <p><a href="#" onClick={this.signIn}><strong>Click here</strong></a> to try again.</p>
      </div>;
    }

    return <div className="auth-loading">
      <img src={logoImg} alt="Logo"/>
    </div>;
  }
}

export default AuthPage;
