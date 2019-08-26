/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import {userSession} from '../../../../blockstack-config';

class AuthPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: null
    }
  }

  componentDidMount() {
    const {history} = this.props;

    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn()
        .then(userData => {
          const {login} = this.props;

          if (userData.username) {
            login(userData);
            history.push('/app/editor');
            return;
          }

          // if username not exists
          this.setState(({error: true}));

        }).catch(() => {
        this.setState(({error: true}));
      });
    }
  }

  signIn = (e) => {
    e.preventDefault();
    userSession.redirectToSignIn();
  };

  render() {
    const {error} = this.state;

    if (error) {
      return <div className="auth-error">
        <p>Sorry :(</p>
        <p>An error has occurred while signing in.</p>
        <p>Please <a href="#" onClick={this.signIn}><strong>click here</strong></a> to try again.</p>
      </div>;
    }

    return null;
  }
}

export default AuthPage;
