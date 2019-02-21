import {Component} from 'react';

import {bindActionCreators} from 'redux';

import connect from 'react-redux/es/connect/connect';

import {login} from '../../store/user';

const blockstack = require('blockstack');

class Auth extends Component {
  componentDidMount() {
    const {user, history} = this.props;

    if (user) {
      history.push('/app/editor');
      return;
    }

    if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn()
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


const mapStateToProps = ({user}) => ({
  user
});


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)