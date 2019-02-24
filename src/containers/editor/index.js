import React, {Component} from 'react';
import {bindActionCreators} from 'redux';

import connect from 'react-redux/es/connect/connect';

import {injectIntl} from 'react-intl';

import {Navbar, Nav, NavDropdown, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

import {logout, setBgBlur, setBgImage, setBgColor, setBio, refreshUserProfile} from '../../store/user';
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

  toggleStyle = () => {
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

  render() {
    const {user, ui} = this.props;
    const {username} = user;

    return (
      <div className="editor-header">


        <SettingsDialog visible={ui.settings} onHide={this.toggleSettings} {...this.props}/>
        {ui.style && <StyleDialog onCancel={this.toggleStyle} onSave={this.toggleStyle} {...this.props} />}
        {!ui.preview &&
        <>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#" onClick={this.goHome}>
              <img src={landerLogo} height={50} className="d-inline-block align-top"/></Navbar.Brand>
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
          <div className="second-nav">
            <div className="left-menu">
              <Button className="btn-preview" variant="light disabled"
                      onClick={this.togglePreview}>{eyeSvg} Preview</Button>
            </div>
            <div className="right-menu">
              <Button className="btn-style" variant="danger" onClick={this.toggleStyle}>{magicSvg} Style</Button>
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
      const {refreshUserProfile} = this.props;
      refreshUserProfile();
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

        <div className="main-wrapper">
          <ProfileBg bg={user.privateData.bg}/>
          <EditorHeader {...this.props} />
          <div className={fixClassNames(`profile-box ${!ui.preview ? 'edit-mode' : ''}`)}>
            <ProfileImage image={image} editMode={!ui.preview} {...this.props}/>
            <ProfileName name={name} editMode={!ui.preview} {...this.props}/>
            <ProfileDescription description={description} editMode={!ui.preview} {...this.props}/>
            <ProfileBio bio={user.privateData.bio} editMode={!ui.preview} {...this.props}/>
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
      setBio,
      refreshUserProfile
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Editor))