import React, {Component} from 'react';

import * as blockStack from 'blockstack';

class AuthPage extends Component {
  componentDidMount() {
    const {user, history} = this.props;

    if (user) {
      history.push('/app/editor');
      return;
    }

    if (blockStack.isSignInPending()) {
      blockStack.handlePendingSignIn()
        .then(userData => {
          const {login} = this.props;
          login(userData);
          history.push('/app/editor');
        });
    }
  }

  render() {
    return null;
  }
}

export default AuthPage;
