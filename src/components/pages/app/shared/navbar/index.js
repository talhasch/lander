/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import landerLogo from '../../../../../images/lander-256.png';

import {logOutSvg, settingsSvg} from '../../../../../svg';

class NavBar extends Component {
  toggleSettings = (e) => {
    if (e) {
      e.preventDefault();
    }
    const {toggleUiProp} = this.props;
    toggleUiProp('settings');
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
    const {user} = this.props;
    const fLetter = user.username.split('')[0].toUpperCase();

    return (
      <div className="nav-bar">
        <a onClick={this.goHome} className="brand" href="/">
          <img src={landerLogo} alt="Logo" height={30} className="d-inline-block align-top"/>
        </a>
        <div className="user-menu">
          <div className="f-letter"><span>{fLetter}</span></div>
          <div className="menu-list">
            <span className="username">{'@'}{user.username}</span>
            <a className="menu-list-item" onClick={this.toggleSettings}>
              Settings {settingsSvg}
            </a>
            <a className="menu-list-item" onClick={this.logout}>
              Logout {logOutSvg}
            </a>
          </div>
        </div>
      </div>
    )
  }
}

NavBar.defaultProps = {};

NavBar.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  toggleUiProp: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  })
};

export default NavBar;
