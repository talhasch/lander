import React, {Component} from 'react';

import connect from 'react-redux/es/connect/connect';

import {bindActionCreators} from 'redux';

import ProfilePage from '../../components/pages/profile';


class ProfileContainer extends Component {
  render() {
    return <ProfilePage {...this.props} />;
  }
}

const mapStateToProps = ({user}) => ({
  user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer)
