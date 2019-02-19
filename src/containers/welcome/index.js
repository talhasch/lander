import React, {Component, Fragment} from 'react';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {FormControl, Button} from 'react-bootstrap'

import {FormattedMessage} from 'react-intl';

import {injectIntl} from 'react-intl';

import {updateLocalFile} from '../../store/local-file'


import validateEmail from '../../utils/validate-email';

import {accountModel, profileModel} from '../../db';


class Welcome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      profile: null,
      name: '',
      description: '',
      email: '',
      step: 1
    };
  }

  componentDidMount() {
    // Check user login
    const {activeUser, localFile, history} = this.props;
    if (!activeUser) {
      history.push('/');
      return;
    }


    const {profile} = window.blockstack.loadUserData();

    this.setState({
      profile,
      name: profile.name ? profile.name : '',
      description: profile.description ? profile.description : '',
      email: profile.email ? profile.email : '',
    });
  };

  nameChanged = (e) => {
    const name = e.target.value;
    this.setState({name});
  };

  descriptionChanged = (e) => {
    const description = e.target.value;
    this.setState({description});
  };

  emailChanged = (e) => {
    const email = e.target.value;
    this.setState({email});
  };

  next1 = () => {
    if (this.isNameOK()) {
      this.setState({
        step: 2
      })
    }
  };

  next2 = () => {
    if (this.isDescriptionOK()) {
      this.setState({
        step: 3
      })
    }
  };

  next3 = () => {
    if (this.isEmailOK()) {
      this.complete();
    }
  };

  skipEmail = () => {
    this.setState({
      email: ''
    }, () => {
      this.complete();
    })
  };

  complete = () => {
    this.setState({step: 4});

    const {name, description, email} = this.state;

    const {profile} = this.state;
    const {account} = profile;

    const socialAccounts = [];
    const walletAccounts = [];

    const btcAccount = account ? accountModel('bitcoin', account.find(x => x.service === 'bitcoin').identifier) : null;
    const ethAccount = account ? accountModel('ethereum', account.find(x => x.service === 'ethereum').identifier) : null;
    const githubAccount = account ? accountModel('github', account.find(x => x.service === 'github').identifier) : null;
    const twitterAccount = account ? accountModel('twitter', account.find(x => x.service === 'twitter').identifier) : null;
    const facebookAccount = account ? accountModel('facebook', account.find(x => x.service === 'facebook').identifier) : null;

    const photo = profile.image && profile.image[0] ? profile.image[0].contentUrl : '';

    [btcAccount, ethAccount].forEach(x => {
      if (x) {
        walletAccounts.push(x)
      }
    });

    [githubAccount, twitterAccount, facebookAccount].forEach(x => {
      if (x) {
        socialAccounts.push(x)
      }
    });

    const rootProps = {
      name,
      description,
      email,
      photo
    };

    const obj = profileModel(rootProps, socialAccounts, walletAccounts);

    const {updateLocalFile, history} = this.props;

    updateLocalFile(obj);

    history.push('/app/editor');
  };

  isNameOK = () => {
    const {name} = this.state;
    return name && name.trim().length >= 2
  };

  isDescriptionOK = () => {
    const {description} = this.state;
    return description && description.trim().length >= 4
  };

  isEmailOK = () => {
    const {email} = this.state;
    return email && validateEmail(email);
  };

  render() {
    const {intl} = this.props;
    const {step, name, description, email} = this.state;

    return <div className="welcome-wrapper">
      <div className="header">
        <span className="lander-logo">L</span>
      </div>
      <h2 className="form-title"><FormattedMessage id="first-form.form-title"/></h2>
      <p className="form-sub-title"><FormattedMessage id="first-form.form-sub-title"/></p>
      {step === 1 &&
      <Fragment>
        <p className="form-label"><FormattedMessage id="first-form.name-label"/></p>
        <div className="form-input">
          <FormControl
            placeholder={intl.formatMessage({'id': 'first-form.name-placeholder'})}
            id="name"
            autoFocus
            value={name}
            onChange={this.nameChanged}
            maxLength={40}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.next1();
              }
            }}
          />
        </div>
        <div className="form-controls">
          <Button variant={this.isNameOK() ? 'primary' : 'outline-primary'} disabled={!this.isNameOK()}
                  onClick={this.next1}><FormattedMessage id="g.next"/></Button>
        </div>
      </Fragment>
      }
      {step === 2 &&
      <Fragment>
        <p className="form-label"><FormattedMessage id="first-form.description-label"/></p>
        <div className="form-input">
          <FormControl
            placeholder={intl.formatMessage({'id': 'first-form.description-placeholder'})}
            id="description"
            autoFocus
            value={description}
            onChange={this.descriptionChanged}
            maxLength={60}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.next2();
              }
            }}
          />
        </div>
        <div className="form-controls">
          <Button variant={this.isDescriptionOK() ? 'primary' : 'outline-primary'} disabled={!this.isDescriptionOK()}
                  onClick={this.next2}><FormattedMessage id="g.next"/></Button>
        </div>
      </Fragment>
      }
      {step === 3 &&
      <Fragment>
        <p className="form-label"><FormattedMessage id="first-form.email-label"/></p>
        <div className="form-input">
          <FormControl
            placeholder={intl.formatMessage({'id': 'first-form.email-placeholder'})}
            type="email"
            id="email"
            autoFocus
            value={email}
            onChange={this.emailChanged}
            maxLength={60}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                if (email.trim() === '') {
                  this.skipEmail();
                } else {
                  this.next3();
                }
              }
            }}
          />
        </div>
        <div className="form-controls">
          <Button variant={this.isEmailOK() ? 'primary' : 'outline-primary'} disabled={!this.isEmailOK()}
                  onClick={this.next3}><FormattedMessage
            id="g.next"/></Button>
          <Button variant="outline-secondary" onClick={this.skipEmail}><FormattedMessage id="g.skip"/></Button>
        </div>
      </Fragment>
      }
    </div>
  }
}

const mapStateToProps = ({activeUser, localFile}) => ({
  activeUser,
  localFile
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateLocalFile
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Welcome))