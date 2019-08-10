import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Navbar, Nav, NavDropdown, OverlayTrigger, Tooltip} from 'react-bootstrap';

import getBaseUrl from '../../../../utils/get-base-url';

import landerLogo from '../../../../images/lander-256.png';

import {linkExternal} from '../../../../svg';
import makeUserUrl from "../../../../helper/user-url";

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

  userUrl = () => {
    const {user} = this.props;
    const suffix = user.alias || user.username;
    return makeUserUrl(suffix);
  };

  render() {
    const {user} = this.props;
    const {username} = user;

    return (
      <Navbar bg="dark" variant="dark" expand="sm">
        <Navbar.Brand href="#" onClick={this.goHome}>
          <img src={landerLogo} alt="Logo" height={30} className="d-inline-block align-top"/></Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Nav className="ml-auto">
            <NavDropdown title={username}>
              <NavDropdown.Item onClick={this.toggleSettings}>Settings</NavDropdown.Item>
              <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
            </NavDropdown>
            {user.published &&
            <OverlayTrigger
              placement="bottom"
              delay={1000}
              overlay={
                <Tooltip>Go to your public page</Tooltip>
              }>
              <Nav.Link href={this.userUrl()} target="_blank"
                        className="public-link d-none d-sm-block">{linkExternal}</Nav.Link>
            </OverlayTrigger>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

NavBar.defaultProps = {};

NavBar.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  toggleUiProp: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    published: PropTypes.shape({})
  })
};

export default NavBar;