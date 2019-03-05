import React, {Component} from 'react';

import {bindActionCreators} from 'redux';

import connect from 'react-redux/es/connect/connect';

import {injectIntl} from 'react-intl';

import {Navbar, Nav, NavDropdown, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

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
} from '../../store/user';

import {toggleUiProp} from '../../store/ui';

import ProfileImage from '../../components/profile-image';
import ProfileName from '../../components/profile-name';
import ProfileDescription from '../../components/profile-description';
import ProfileBg from '../../components/profile-bg';
import SocialAccounts from '../../components/social-accounts';
import WalletAccounts from '../../components/wallet-accounts';
import ProfileBio from '../../components/profile-bio';

import SettingsDialog from '../../components/dialogs/settings';
import StyleDialog from '../../components/dialogs/style';

import AccountEditDialog from '../../components/dialogs/account-edit';
import BioEditDialog from '../../components/dialogs/bio-edit';
import Spinner from '../../components/elements/spinner';

import fixClassNames from '../../utils/fix-class-names';

import getBaseUrl from '../../utils/get-base-url';
import makeUserUrl from '../../helper/user-url';

import showError from '../../utils/show-error';

import landerLogo from '../../images/lander-256.png';

import {eyeSvg, eyeSlashSvg, magicSvg, linkExternal} from '../../svg';


class InfoNav extends Component {

  publish = () => {
    const {publish, publishDone, publishError} = this.props;
    publish().then((newData) => {
      publishDone(newData);
    }).catch(err => {
      publishError();
      showError(String(err));
    });
  };

  render() {
    const {user} = this.props;

    const userUrl = makeUserUrl(user.username);

    if (!user.published) {
      return <div className="info-nav">
        <div className="info-content">
          <div className="info-msg">Your Lander page hasn't published yet</div>
          <div className="info-controls">
            <Button variant="primary" onClick={this.publish}
                    disabled={user.publishing}>Publish{user.publishing && '...'}</Button>
          </div>
        </div>
      </div>
    }

    if (user.published && user.draft.updated !== user.published.updated) {
      return <div className="info-nav">
        <div className="info-content">
          <div className="info-msg">Last change you've made hasn't published</div>
          <div className="info-controls">
            <Button variant="primary" onClick={this.publish}
                    disabled={user.publishing}>Publish{user.publishing && '...'}</Button>
          </div>
        </div>
      </div>;
    }


    return <div className="info-nav">
      <a className="user-address" href={userUrl} target="_blank" rel="noopener noreferrer">{userUrl}</a>
    </div>;
  }
}

class EditorHeader extends Component {

  toggleSettings = (e) => {
    if (e) {
      e.preventDefault();
    }
    const {toggleUiProp} = this.props;
    toggleUiProp('settings');
    return false;
  };

  showStyle = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('style');
    return false;
  };

  togglePreview = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('preview');
    return false;
  };

  logout = (e) => {
    e.preventDefault();
    const {logout, history} = this.props;
    logout();
    history.push('/');
  };

  goHome = (e) => {
    e.preventDefault();
    const {history} = this.props;
    history.push('/');
  };


  revert = () => {

  };

  render() {
    const {user, ui} = this.props;
    const {username} = user;

    return (
      <div className="editor-header">

        {!ui.preview &&
        <>
          <Navbar bg="dark" variant="dark" expand="sm">
            <Navbar.Brand href="#" onClick={this.goHome}>
              <img src={landerLogo} alt="Logo" height={30} className="d-inline-block align-top"/></Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
              <Nav className="ml-auto">
                <NavDropdown title={username}>
                  <NavDropdown.Item href="#" onClick={this.toggleSettings}>Settings</NavDropdown.Item>
                  <NavDropdown.Item href="#" onClick={this.logout}>Logout</NavDropdown.Item>
                </NavDropdown>
                {user.published &&
                <OverlayTrigger
                  placement="bottom"
                  delay={1000}
                  overlay={
                    <Tooltip>Go to your public page</Tooltip>
                  }>
                  <Nav.Link href={`${getBaseUrl()}/${user.username}`} target="_blank"
                            className="public-link d-none d-sm-block">{linkExternal}</Nav.Link>
                </OverlayTrigger>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <InfoNav {...this.props} />
          <div className="second-nav">
            <div className="left-menu">
              <Button className="btn-preview" variant="light disabled"
                      onClick={this.togglePreview}>{eyeSvg} Preview</Button>
            </div>
            <div className="right-menu">
              <Button className="btn-style" variant="danger" onClick={this.showStyle}>{magicSvg} Style</Button>
            </div>
          </div>
        </>
        }

        {ui.preview &&
        <OverlayTrigger
          placement="right"
          delay={1000}
          overlay={
            <Tooltip>Toggle Preview Mode</Tooltip>
          }>
          <Button className="btn-preview-off" variant="light disabled"
                  onClick={this.togglePreview}>{eyeSlashSvg}</Button>
        </OverlayTrigger>
        }
      </div>
    )
  }
}

class Editor extends Component {

  componentDidMount() {
    const {user} = this.props;
    if (!user) {
      const {history} = this.props;
      history.push('/');
    }

    document.addEventListener('visibilitychange', this.visibilityChanged);
  }

  componentWillUnmount() {
    document.removeEventListener('visibilitychange', this.visibilityChanged);
  }

  visibilityChanged = () => {
    if (document.visibilityState === 'visible') {
      const {loadProfile} = this.props;
      loadProfile();
    }
  };

  render() {

    const {user, ui} = this.props;
    if (!(user && user.loaded)) {
      return <Spinner/>;
    }

    const {name, description, image, account} = user.profile;

    return (
      <>
        {ui.accountEdit && <AccountEditDialog {...this.props} />}
        {ui.bioEdit && <BioEditDialog {...this.props} />}
        {ui.style && <StyleDialog {...this.props} />}
        {ui.settings && <SettingsDialog {...this.props} />}
        <div className={ui.preview ? 'main-wrapper-profile' : 'main-wrapper'}>
          <ProfileBg bg={user.draft.bg}/>
          <div className="inner-wrapper">
            <EditorHeader {...this.props} />
            <div className={fixClassNames(`profile-box ${!ui.preview ? 'edit-mode' : ''}`)}>
              <ProfileImage image={image} editMode={!ui.preview} {...this.props}/>
              <ProfileName name={name} editMode={!ui.preview} {...this.props}/>
              <ProfileDescription description={description} editMode={!ui.preview} {...this.props}/>
              <ProfileBio bio={user.draft.bio} editMode={!ui.preview} {...this.props}/>
              <SocialAccounts accounts={account} editMode={!ui.preview} {...this.props}/>
              <WalletAccounts accounts={account} editMode={!ui.preview} {...this.props}/>
            </div>
          </div>
        </div>
      </>
    )
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
)(injectIntl(Editor))