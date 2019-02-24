import React, {Component} from 'react';
import {bindActionCreators} from 'redux';

import connect from 'react-redux/es/connect/connect';

import {injectIntl} from 'react-intl';

import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';

import {logout, setBgBlur, setBgImage, setBgColor} from '../../store/user';
import {toggleUiProp} from '../../store/ui';

import ProfileImage from '../../components/profile-image';
import ProfileName from '../../components/profile-name';
import ProfileDescription from '../../components/profile-description';
import ProfileBg from '../../components/profile-bg';
import SocialAccounts from '../../components/social-accounts';
import WalletAccounts from '../../components/wallet-accounts';

import SettingsDialog from '../../components/dialogs/settings';
import StyleDialog from '../../components/dialogs/style';
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
        <Button className="btn-preview-off" variant="light disabled" onClick={this.togglePreview}>{eyeSlashSvg}</Button>
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

    /*
    document.addEventListener("visibilitychange", function(a) {
     // console.log(a)
     // console.log( document.visibilityState );
    });
    */
  }

  render() {

    const {user} = this.props;
    if (!(user && user.loaded)) {
      return null;
    }

    const {name, description, image, account} = user.profile;


    return (

      <div className="main-wrapper">
        <ProfileBg bg={user.privateData.bg}/>
        <EditorHeader {...this.props} />
        <div className="profile-box">
          <ProfileImage image={image} {...this.props} />
          <ProfileName name={name} {...this.props}/>
          <ProfileDescription description={description} {...this.props}/>
          <div className="profile-bio">

          </div>
          <SocialAccounts accounts={account} editMode/>
          <WalletAccounts accounts={account} editMode/>
        </div>
      </div>
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
      setBgColor
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Editor))