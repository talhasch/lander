import React, {Component, Fragment} from 'react';

import {InputGroup, FormControl, Button} from 'react-bootstrap'

import {FormattedMessage} from 'react-intl';

import validateEmail from "../../utils/validate-email";

import {injectIntl} from 'react-intl';

class FirstForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      title: '',
      email: '',
      step: 1
    }
  }

  nameChanged = (e) => {
    const name = e.target.value;
    this.setState({name});
  };

  titleChanged = (e) => {
    const title = e.target.value;
    this.setState({title});
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
    if (this.isTitleOK()) {
      this.setState({
        step: 3
      })
    }
  };

  next3 = () => {

  };

  isNameOK = () => {
    const {name} = this.state;
    return name.trim().length >= 2
  };

  isTitleOK = () => {
    const {title} = this.state;
    return title.trim().length >= 4
  };

  isEmailOK = () => {
    const {email} = this.state;
    return validateEmail(email);
  };

  render() {
    const {intl} = this.props;
    const {step, name, title, email} = this.state;

    return <div className="first-form-wrapper">
      <div className="header">
        <span className="lander-logo">L</span>
      </div>
      <h2 className="form-title"><FormattedMessage id="first-form.form-title"/></h2>
      <p className="form-sub-title"><FormattedMessage id="first-form.form-sub-title"/></p>
      {step === 1 &&
      <Fragment>
        <p className="form-label"><FormattedMessage id="first-form.name-label"/></p>
        <InputGroup>
          <FormControl
            placeholder={intl.formatMessage({'id': 'first-form.name-placeholder'})}
            id="name"
            autoFocus
            value={name}
            onChange={this.nameChanged}
            maxLength={40}
          />
          <InputGroup.Append>
            <Button variant={this.isNameOK() ? 'primary' : 'outline-primary'} disabled={!this.isNameOK()}
                    onClick={this.next1}><FormattedMessage id="g.next"/></Button>
          </InputGroup.Append>
        </InputGroup>
      </Fragment>
      }
      {step === 2 &&
      <Fragment>
        <p className="form-label"><FormattedMessage id="first-form.title-label"/></p>
        <InputGroup>
          <FormControl
            placeholder={intl.formatMessage({'id': 'first-form.title-placeholder'})}
            id="title"
            autoFocus
            value={title}
            onChange={this.titleChanged}
            maxLength={60}
          />
          <InputGroup.Append>
            <Button variant={this.isTitleOK() ? 'primary' : 'outline-primary'} disabled={!this.isTitleOK()}
                    onClick={this.next2}><FormattedMessage id="g.next"/></Button>
          </InputGroup.Append>
        </InputGroup>
      </Fragment>
      }
      {step === 3 &&
      <Fragment>
        <p className="form-label"><FormattedMessage id="first-form.email-label"/></p>
        <InputGroup>
          <FormControl
            placeholder={intl.formatMessage({'id': 'first-form.email-placeholder'})}
            id="email"
            autoFocus
            value={email}
            onChange={this.emailChanged}
            maxLength={60}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary"><FormattedMessage id="g.skip"/></Button>
            <Button variant={this.isEmailOK() ? 'primary' : 'outline-primary'} disabled={!this.isEmailOK()}
                    onClick={this.next3}><FormattedMessage
              id="g.next"/></Button>
          </InputGroup.Append>
        </InputGroup>
      </Fragment>
      }
    </div>
  }
}

export default injectIntl(FirstForm)