import React, {Component} from 'react';

import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';

import * as blockStack from 'blockstack';

import getBaseUrl from '../../../utils/get-base-url';

import blockStackLogo from '../../../images/blockstack-bug-rev.svg'

import {Nav, Navbar, NavDropdown, Button} from 'react-bootstrap';

import landerLogo from '../../../images/lander-512.png';

import bitey from '../../../images/bitey.jpg';

class HomePage extends Component {
  signIn = () => {
    if (blockStack.isUserSignedIn()) {
      const {history} = this.props;
      history.push('/app/editor');
      return;
    }

    const base = getBaseUrl();
    const redir = `${base}/app/auth`;
    const manifest = `${base}/manifest.json`;
    const scope = ['store_write', 'publish_data'];

    blockStack.redirectToSignIn(redir, manifest, scope);
  };

  render() {

    return (
      <div className="home-wrapper">
        <div className="section-container">
          <Navbar collapseOnSelect expand="md" bg="light">
            <Navbar.Brand><img src={landerLogo} alt="Logo" width={50}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#get-started">Get Started</Nav.Link>
                <Nav.Link href="#sign-in">Sign In</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>

        <div className="intro">
          <div className="section-container section-container-intro">
            <div className="showcase">
              <div className="showcase-header">
                <div className="address-bar">
                  https://landr.me/mrbitey.id
                </div>
              </div>
              <div className="showcase-content">
                <img src={bitey} alt="Mr. Bitey"/>
              </div>
            </div>
            <div className="intro-content">
              <h1 className="main-title"><FormattedMessage id="home.title"/></h1>
              <p className="description"><FormattedMessage id="home.description"/></p>
              <Button onClick={this.signIn} variant="login" size="lg">
                <img src={blockStackLogo} alt="Blockstack Logo" className="bl-icon"/>
                <FormattedMessage id="home.login"/>
              </Button>
              <div className="what-is-blockstack">
                <a className="what-is-blockstack" href="#">What is Blockstack?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage