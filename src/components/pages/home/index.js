/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {Component} from 'react';

import {userSession} from '../../../blockstack-config';

import {Nav, Navbar, Button, Row, Col, Modal} from 'react-bootstrap';

import {b64EncodeUnicode} from '../../../utils/base64';

import landerLogo from '../../../images/lander-512.png';

import jasmine from '../../../images/jasmine.jpg';
import melissa from '../../../images/melissa.jpg';

import beautifulPng from '../../../images/features/beautiful.png';
import freePng from '../../../images/features/free.png';
import cryptoPng from '../../../images/features/cryptocurrency.png';
import responsivePng from '../../../images/features/responsive.png';

import {
  twitterSvg,
  githubSvg,
  phSvg
} from '../../../svg';

class SignInModal extends Component {
  signIn = () => {
    const {hide} = this.props;
    hide();

    setTimeout(() => {
      userSession.redirectToSignIn();
    }, 300);
  };

  render() {
    const {hide} = this.props;

    return <Modal show onHide={hide} centered size="lg" className="sign-in-dialog">
      <Modal.Header closeButton/>
      <Modal.Body>
        <div className="left-side">
          <div className="logo">
            <img src={landerLogo} alt="Logo" width={52}/>
          </div>
          <p>Login to get started.</p>
          <Button onClick={this.signIn}>Continue with Blockstack</Button>
        </div>
        <div className="right-side">
          <p className="title">What is Blockstack?</p>
          <p>Lander is built using Blockstack infrastructure, allowing us to provide decentralized encrypted
            storage.</p>
          <p>Blockstack ID provides user-controlled login and storage that enable you to take back control of your
            identity and data.</p>
        </div>
      </Modal.Body>
    </Modal>;
  }
}

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signIn: false,
      explore: []
    }
  }

  componentDidMount() {
    fetch('/showcase.json')
      .then(r => r.json())
      .then(r => {
        const s = r.sort(() => 0.5 - Math.random()).slice(0, 24);
        this.setState({explore: s})
      })
  }

  toggleSignIn = (e) => {
    const {user} = this.props;

    if (userSession.isUserSignedIn() && user !== null) {
      const {history} = this.props;
      history.push('/app/editor');
      return;
    }

    if (e) {
      e.preventDefault();
    }

    const {signIn} = this.state;

    this.setState({signIn: !signIn});
  };

  render() {
    const {signIn, explore} = this.state;

    return (
      <div className="home-wrapper">
        <div className="section-container">
          <Navbar collapseOnSelect expand="md" bg="light">
            <Navbar.Brand><img src={landerLogo} alt="Logo" width={70}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#explore">Explore</Nav.Link>
                <Nav.Link href="#login" onClick={this.toggleSignIn}>Sign In</Nav.Link>
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
              <h1 className="main-title">Your personal home page</h1>
              <p className="description">Lander lets you create your personal home page in just a few minutes</p>
              <Button onClick={this.toggleSignIn} variant="sign-in" size="lg">
                Get your free page
              </Button>
            </div>
          </div>
        </div>
        <section className="features" id="features">
          <div className="section-container">
            <div className="section-header">
              <h2><a name="features">Lander</a></h2>
            </div>
            <Row className="feature-list">
              <Col className="feature" sm={12} md={{span: 6}}>
                <div className="image">
                  <img src={beautifulPng} alt="Beautifully Easy"/>
                </div>
                <div className="content">
                  <div className="title">
                    Beautifully Easy
                  </div>
                  <div className="text">
                    Setup your page in minutes and customise it with super easy user interface depending on your
                    preferences.
                  </div>
                </div>
              </Col>
              <Col className="feature mm" sm={12} md={{span: 6}}>
                <div className="image">
                  <img src={freePng} alt="Free & Unlimited"/>
                </div>
                <div className="content">
                  <div className="title">
                    Free & Unlimited
                  </div>
                  <div className="text">
                    All features of Lander are 100% free. You can create as much as pages you want for free. There is no
                    limit!
                  </div>
                </div>
              </Col>
              <Col className="feature" sm={12} md={{span: 6}}>
                <div className="image">
                  <img src={cryptoPng} alt="Cryptocurrency Friendly"/>
                </div>
                <div className="content">
                  <div className="title">
                    Cryptocurrency Friendly
                  </div>
                  <div className="text">
                    Add your cryptocurrency addresses to your page and make it easier to accept payments.
                  </div>
                </div>
              </Col>
              <Col className="feature" sm={12} md={{span: 6}}>
                <div className="image">
                  <img src={responsivePng} alt="Responsive"/>
                </div>
                <div className="content">
                  <div className="title">
                    Responsive
                  </div>
                  <div className="text">
                    Looks and feels great at every screen size right out of the box, from phones to tablets to desktops.
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>
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
        <section className="explore" id="explore">
          <div className="section-header">
            <h2><a name="get-started">Explore</a></h2>
          </div>
          <div className="list-container">
            <div className="explore-list">
              {explore.map(x => {
                return <a key={x.username} href={`/${x.username}`} title={x.name} className="explore-item"
                          style={{backgroundImage: `url('https://landr.me/i-p/${b64EncodeUnicode(x.photo)}/120x120')`}}>
                </a>
              })}
            </div>
          </div>
        </section>
        <div className="aM">
          <Button onClick={this.toggleSignIn} variant="sign-in" size="lg">
            Get your free page
          </Button>
        </div>
        <div className="footer">
          <div className="section-container section-container-footer">
            <Row>
              <Col className="footer-menu" sm={12} md={3}>
                <div className="menu-header">
                  Lander
                </div>
                <div className="menu-item">
                  <a href="#features">Features</a>
                </div>
                <div className="menu-item">
                  <a href="#explore">Explore</a>
                </div>
                <div className="menu-item">
                  <a href="#sign-in" onClick={this.toggleSignIn}>Sign In</a>
                </div>
              </Col>
              <Col className="footer-menu" sm={12} md={3}>
                <div className="menu-header">
                  Blockstack
                </div>
                <div className="menu-item">
                  <a href="https://blockstack.org/what-is-blockstack/">What is blockstack?</a>
                </div>
                <div className="menu-item">
                  <a href="https://github.com/blockstack/gaia">Gaia storage</a>
                </div>
              </Col>
              <Col className="footer-menu" sm={12} md={3}>
                <div className="menu-header">
                  Support
                </div>
                <div className="menu-item">
                  <a href="mailto:hello@landr.me">Contact</a>
                </div>
              </Col>
              <Col className="social-menu" sm={12} md={3}>
                <a className="social-link" href="https://twitter.com/landr_me">
                  {twitterSvg}
                </a>
                <a className="social-link" href="https://github.com/talhasch/lander">
                  {githubSvg}
                </a>
                <a className="social-link" href="https://www.producthunt.com/posts/lander-2">
                  {phSvg}
                </a>
              </Col>
            </Row>
          </div>
        </div>
        {signIn && <SignInModal {...this.props} hide={this.toggleSignIn}/>}
      </div>
    )
  }
}

export default HomePage
