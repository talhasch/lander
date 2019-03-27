import {Component} from 'react';

import {userSession} from '../../../blockstack-config';

class AuthPage extends Component {
  componentDidMount() {
    const {user, history} = this.props;

    if (user) {
      history.push('/app/editor');
      return;
    }

    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn()
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
