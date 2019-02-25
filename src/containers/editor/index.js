import React, {Component} from 'react';
import {bindActionCreators} from 'redux';

import connect from 'react-redux/es/connect/connect';

import {injectIntl} from 'react-intl';

import {Navbar, Nav, NavDropdown, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

import {logout, setBgBlur, setBgImage, setBgColor, setBio, saveDraft, publish, refreshProfile} from '../../store/user';
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
import BioEditDialog from '../../components/dialogs/bio-edit'

import fixClassNames from '../../utils/fix-class-names';

import landerLogo from '../../images/lander-256.png';

import {eyeSvg, eyeSlashSvg, magicSvg} from '../../svg';

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

  publish = () => {
    const {publish} = this.props;

    publish();
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
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#" onClick={this.goHome}>
              <img src={landerLogo} height={30} className="d-inline-block align-top"/></Navbar.Brand>
            <Navbar.Collapse id="navbar-nav">
              <Nav className="ml-auto">
                <NavDropdown title={username} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#" onClick={this.toggleSettings}>Settings</NavDropdown.Item>
                  <NavDropdown.Item href="" onClick={this.logout}>Logout</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#features">L</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          {!user.published &&
          <div className="info-nav">
            <div className="info-content">
              <div className="info-msg">Your Lander page hasn't published yet.</div>
              <div className="info-controls">
                <Button variant="primary" onClick={this.publish}
                        disabled={user.publishing}>Publish {user.publishing && '...'}</Button>
              </div>
            </div>
          </div>
          }

          {(user.published && user.draft.updated !== user.published.updated) &&
          <>
            <div className="info-nav">
              <div className="info-content">
                <div className="info-msg">Last changes you have made hasn't published.</div>
                <div className="info-controls">
                  <Button variant="primary" onClick={this.publish}
                          disabled={user.publishing}>Publish {user.publishing && '...'}</Button>
                </div>
              </div>
            </div>
          </>
          }

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
      const {refreshProfile} = this.props;
      refreshProfile();
    }
  };

  render() {

    const {user, ui} = this.props;
    if (!(user && user.loaded)) {
      return null;
    }

    const {name, description, image, account} = user.profile;

    return (
      <>
        {ui.accountEdit && <AccountEditDialog {...this.props} />}
        {ui.bioEdit && <BioEditDialog {...this.props} />}
        {ui.style && <StyleDialog {...this.props} />}
        {ui.settings && <SettingsDialog {...this.props} />}

        <div className="main-wrapper">
          <ProfileBg bg={user.draft.bg}/>
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
      toggleUiProp,
      setBgBlur,
      setBgImage,
      setBgColor,
      saveDraft,
      setBio,
      refreshProfile,
      publish
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Editor))