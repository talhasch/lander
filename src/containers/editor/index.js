import React, {Component} from 'react';
import {bindActionCreators} from 'redux';

import connect from 'react-redux/es/connect/connect';

import {injectIntl} from 'react-intl';

import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

import {logout} from '../../store/user';
import {toggleSettings} from '../../store/dialogs';

import ProfileImage from '../../components/profile-image';
import ProfileName from '../../components/profile-name';
import ProfileDescription from '../../components/profile-description';
import ProfileBg from '../../components/profile-bg';
import SocialAccounts from '../../components/social-accounts';
import WalletAccounts from '../../components/wallet-accounts';

import SettingsDialog from '../../components/dialogs/settings';

class EditorHeader extends Component {

  toggleSettings = (e) => {
    if (e) {
      e.preventDefault();
    }
    const {toggleSettings} = this.props;
    toggleSettings();
    return false;
  };

  logout = (e) => {
    e.preventDefault();
    const {logout, history} = this.props;
    logout();
    history.push('/');
  };

  render() {
    const {user, dialogs} = this.props;
    const {username} = user;
    return (
      <div className="editor-header">
        <SettingsDialog visible={dialogs.settings} onHide={this.toggleSettings}/>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Lander</Navbar.Brand>
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <NavDropdown title={username} id="collasible-nav-dropdown">
                <NavDropdown.Item href="#" onClick={this.toggleSettings}>Settings</NavDropdown.Item>
                <NavDropdown.Item href="" onClick={this.logout}>Logout</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#features">Features</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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


const mapStateToProps = ({user, dialogs}) => ({
  user,
  dialogs
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
      toggleSettings
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Editor))