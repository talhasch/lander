import React, {Component} from 'react';

import {bindActionCreators} from 'redux';

import connect from 'react-redux/es/connect/connect';

import EditorPage from '../../../components/pages/app/profile-editor'

import {
  logout,
  setPhoto,
  setName,
  setDescription,
  setAccount,
  setWallet,
  setContact,
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


class EditorContainer extends Component {
  render() {
    return <EditorPage {...this.props} />
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
      setPhoto,
      setName,
      setDescription,
      setAccount,
      setWallet,
      setContact,
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
)(EditorContainer)
