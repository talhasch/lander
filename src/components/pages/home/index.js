import React, {Component} from 'react';

import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';

import * as blockStack from 'blockstack';

import getBaseUrl from '../../../utils/get-base-url';

import blockStackLogo from '../../../images/blockstack-bug-rev.svg'

import {Nav, Navbar, Button, Row, Col} from 'react-bootstrap';

import landerLogo from '../../../images/lander-512.png';

import bitey from '../../../images/bitey.jpg';

import {codeSvg, twitterSvg, githubSvg, phSvg} from '../../../svg'

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


  feature = (icon, title, text) => {
    return <Col className="feature" sm={12} md={4}>
      <div className="icon">
        {icon}
      </div>
      <div className="content">

        <div className="title">
          {title}
        </div>

        <div className="text">
          {text}
        </div>

      </div>

    </Col>
  };

  render() {

    return (
      <div className="home-wrapper">
        <div className="section-container">
          <Navbar collapseOnSelect expand="md" bg="light">
            <Navbar.Brand><img src={landerLogo} alt="Logo" width={70}/></Navbar.Brand>
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

        <div className="features">
          <div className="section-container">
            <div className="section-header">
              <h2>Why you should use Lander?</h2>
            </div>

            <Row className="feature-list">
              {this.feature(codeSvg, 'Free', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at dui massa')}
              {this.feature(codeSvg, 'Free', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at dui massa')}
              {this.feature(codeSvg, 'Free', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at dui massa')}
              {this.feature(codeSvg, 'Free', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at dui massa')}
              {this.feature(codeSvg, 'Free', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at dui massa')}
              {this.feature(codeSvg, 'Free', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at dui massa')}
            </Row>
          </div>
        </div>

        <div className="get-started">
          <div className="section-container">
            <div className="section-header">
              <h2>Get Started</h2>
            </div>

            <p> This video shows how you create you Lander page in seconds.</p>

            <div className="get-started-video">

            </div>
          </div>
        </div>

        <div className="footer">


          <div className="section-container section-container-footer">
            <Row>
              <Col className="footer-menu" sm={12} md={3}>
                <div className="menu-header">
                  Lander
                </div>
                <div className="menu-item">
                  <a href="#">Features</a>
                </div>
                <div className="menu-item">
                  <a href="#">Get Started</a>
                </div>
                <div className="menu-item">
                  <a href="#">Sign In</a>
                </div>
              </Col>

              <Col className="footer-menu" sm={12} md={3}>
                <div className="menu-header">
                  Blockstack
                </div>
                <div className="menu-item">
                  <a href="#">What is blockstack</a>
                </div>
                <div className="menu-item">
                  <a href="#">Gaia storage</a>
                </div>
              </Col>

              <Col className="footer-menu" sm={12} md={3}>
                <div className="menu-header">
                  Support
                </div>
                <div className="menu-item">
                  <a href="#">Contact</a>
                </div>
                <div className="menu-item">
                  <a href="#">Roadmap</a>
                </div>
              </Col>

              <Col className="social-menu" sm={12} md={3}>
                <a className="social-link" href="#">
                  {twitterSvg}
                </a>
                <a className="social-link" href="#">
                  {githubSvg}
                </a>
                <a className="social-link" href="#">
                  {phSvg}
                </a>
              </Col>

            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage