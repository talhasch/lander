import React, {Component} from 'react';

import {bindActionCreators} from 'redux';

import connect from 'react-redux/es/connect/connect';

import WelcomePage from '../../../components/pages/app/welcome'

import {
  logout,
  setBgBlur,
  setBgImage,
  setBgColor,
  setBio,
  saveDraft,
  saveDraftDone,
  saveDraftError,
  publish,
  publishDone,
  publishError,
  loadProfile
} from '../../../store/user';

import {toggleUiProp} from '../../../store/ui';


class WelcomeContainer extends Component {
  render() {
    return <WelcomePage {...this.props} />
  }
}


const mapStateToProps = ({user, ui}) => ({
  user,
  ui
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
      loadProfile,
      toggleUiProp,
      setBgBlur,
      setBgImage,
      setBgColor,
      setBio,
      saveDraft,
      saveDraftDone,
      saveDraftError,
      publish,
      publishDone,
      publishError
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeContainer)