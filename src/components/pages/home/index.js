import React, {Component} from 'react';

import {animateScroll as scroll} from "react-scroll";

import * as blockStack from 'blockstack';

import getBaseUrl from '../../../utils/get-base-url';

import {Nav, Navbar, Button, Row, Col} from 'react-bootstrap';

import landerLogo from '../../../images/lander-512.png';

import jasmine from '../../../images/jasmine.jpg';
import melissa from '../../../images/melissa.jpg';
import steven from '../../../images/steven.jpg';


import {
  coctailSvg,
  smileSvg,
  shieldSvg,
  sketchSvg,
  codeSvg,
  codeBranchSvg,
  infinitySvg,
  mobileSvg,
  twitterSvg,
  githubSvg,
  phSvg
} from '../../../svg'

class HomePage extends Component {
  signIn = (e) => {
    e.preventDefault();

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

  goFeatures = (e) => {
    e.preventDefault();
    const a = document.querySelector('.features').getBoundingClientRect().top - 20;
    scroll.scrollTo(a);
  };

  goGetStarted = (e) => {
    e.preventDefault();
    const a = document.querySelector('.get-started').getBoundingClientRect().top - 20;
    scroll.scrollTo(a);
  };

  feature = (icon, title, text, offset=true) => {
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
                <Nav.Link href="#features" onClick={this.goFeatures}>Features</Nav.Link>
                <Nav.Link href="#get-started" onClick={this.goGetStarted}>Get Started</Nav.Link>
                <Nav.Link href="#sign-in" onClick={this.signIn}>Sign In</Nav.Link>
                <Nav.Link href="https://blockstack.org/what-is-blockstack/" target="_blank"
                          rel="noopener noreferrer" >Blockstack</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div className="intro">
          <div className="section-container section-container-intro">
            <div className="showcase">
              <div className="showcase-header">
                <div className="address-bar">
                  https://landr.me/jasmine.id
                </div>
              </div>
              <div className="showcase-content">
                <img src={jasmine} alt="Jasmine"/>
              </div>
            </div>
            <div className="intro-content">
              <h1 className="main-title">Your personal home page on decentralized internet</h1>
              <p className="description">Lander lets you create your personal home page in just a few minutes.</p>
              <Button onClick={this.signIn} variant="sign-in" size="lg">
                Get your free page
              </Button>
            </div>
          </div>
        </div>
        <div className="features">
          <div className="section-container">
            <div className="section-header">
              <h2>Why you should use Lander?</h2>
            </div>
            <Row className="feature-list">
              {this.feature(sketchSvg, 'Beautifully Easy', 'Setup your page in minutes and customise it with super easy user interface depending on your preferences.')}
              {this.feature(coctailSvg, 'Free & Unlimited', 'All features of Lander are 100% free. You can create as much as pages you want for free. There is no limit!')}
              {this.feature(shieldSvg, 'Secure', 'Your privacy is first. Lander works with Blockstack auth on Gaia storage. No one can spy or use your data but you.')}
              {this.feature(mobileSvg, 'Responsive', 'Looks and feels great at every screen size right out of the box, from phones to tablets to desktops.')}
              {this.feature(codeSvg, 'Open Source', ' Lander is open sourced on github under MIT licence. Feel free to view code and let us know your feedbacks.')}
              {this.feature(codeBranchSvg, 'Growing', 'This is just beginning. We have a lot of development in pipeline like domain connecting, page metrics, showcase etc...')}
            </Row>
          </div>
        </div>

        <div className="aM">
          <Button onClick={this.signIn} variant="sign-in" size="lg">
            Get your free page
          </Button>
        </div>

        <div className="aX">
          <div className="section-container">
          <div className="showcase">
            <div className="showcase-header">
              <div className="address-bar">
                https://landr.me/melissa.id
              </div>
            </div>
            <div className="showcase-content">
              <img src={melissa} alt="Jasmine"/>
            </div>
          </div>
          <h3>Create a home page to present yourself and what you do in one link.</h3>
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



        <div className="aY">
          <div className="section-container">
            <div className="showcase">
              <div className="showcase-header">
                <div className="address-bar">
                  https://landr.me/steven.id
                </div>
              </div>
              <div className="showcase-content">
                <img src={steven} alt="Steven"/>
              </div>
            </div>

            <h3>You're somebody who deserves a beautiful personal home page.</h3>
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
                  <a href="#features" onClick={this.goFeatures}>Features</a>
                </div>
                <div className="menu-item">
                  <a href="#get-started" onClick={this.goGetStarted}>Get Started</a>
                </div>
                <div className="menu-item">
                  <a href="#sign-in" onClick={this.signIn}>Sign In</a>
                </div>
              </Col>
              <Col className="footer-menu" sm={12} md={3}>
                <div className="menu-header">
                  Blockstack
                </div>
                <div className="menu-item">
                  <a href="https://blockstack.org/what-is-blockstack/" target="_blank"
                     rel="noopener noreferrer">What is blockstack?</a>
                </div>
                <div className="menu-item">
                  <a href="https://github.com/blockstack/gaia" target="_blank"
                     rel="noopener noreferrer">Gaia storage</a>
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
                  <a href="https://github.com/talhasch/lander/blob/master/roadmap.md" target="_blank"
                     rel="noopener noreferrer">Roadmap</a>
                </div>
              </Col>
              <Col className="social-menu" sm={12} md={3}>
                <a className="social-link" href="https://twitter.com/landr_me" target="_blank"
                   rel="noopener noreferrer">
                  {twitterSvg}
                </a>
                <a className="social-link" href="https://github.com/talhasch/lander" target="_blank"
                   rel="noopener noreferrer">
                  {githubSvg}
                </a>
                <a className="social-link" href="https://www.producthunt.com/posts/lander-2" target="_blank"
                   rel="noopener noreferrer">
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