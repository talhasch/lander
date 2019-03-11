import React, {Component} from 'react';

import {bindActionCreators} from 'redux';

import connect from 'react-redux/es/connect/connect';

import {login} from '../../store/user';

import AuthPage from '../../components/pages/auth'

class AuthContainer extends Component {
  render() {
    return <AuthPage {...this.props} />;
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
)(AuthContainer);