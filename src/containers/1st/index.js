import React, {Component, Fragment} from 'react';

import {Form, InputGroup, FormControl, Button} from 'react-bootstrap'

import {FormattedMessage} from 'react-intl';

import getBaseUrl from '../../utils/get-base-url';

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
    return title.trim().length >= 6
  };

  isEmailOK = () => {
    return true;
  };


  render() {
    const {step, name, title, email} = this.state;

    return <div className="first-form-wrapper">
      <div className="header">
        <span className="lander-logo">L</span>
      </div>
      <h2 className="form-title">Welcome on board!</h2>
      <p className="form-sub-title">Before start, let's create your basic profile information.</p>
      {step === 1 &&
      <Fragment>
        <p className="form-label">Please enter your name below</p>
        <InputGroup>
          <FormControl
            placeholder="Your name"
            id="name"
            autoFocus
            value={name}
            onChange={this.nameChanged}
            maxLength={40}
          />
          <InputGroup.Append>
            <Button variant={this.isNameOK() ? 'primary' : 'outline-primary'}
                    onClick={this.next1}>Next</Button>
          </InputGroup.Append>
        </InputGroup>
      </Fragment>
      }
      {step === 2 &&
      <Fragment>
        <p>An awesome title for you profile</p>
        <InputGroup>
          <FormControl
            placeholder="Your profile title"
            autoFocus
            value={title}
            onChange={this.titleChanged}
            maxLength={60}
          />
          <InputGroup.Append>
            <Button variant={this.isTitleOK() ? 'primary' : 'outline-primary'}
                    onClick={this.next2}>Next</Button>
          </InputGroup.Append>
        </InputGroup>
      </Fragment>
      }
      {step === 3 &&
      <Fragment>
        <p>If you want to people contact you on your profile page you can enter your e-mail address. Or skip it.</p>
        <InputGroup>
          <FormControl
            placeholder="Your e-mail address"
            autoFocus
            value={email}
            onChange={this.emailChanged}
            maxLength={60}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" >Skip</Button>
            <Button variant={this.isEmailOK() ? 'primary' : 'outline-primary'} onClick={this.next3}>Next</Button>
          </InputGroup.Append>
        </InputGroup>
      </Fragment>
      }
    </div>
  }
}

export default injectIntl(FirstForm)