import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, InputGroup, FormControl, Form} from 'react-bootstrap';

import {FormattedMessage} from 'react-intl';

import {parsePhoneNumberFromString} from 'libphonenumber-js';

import validateEmail from '../../../utils/validate-email';

import validateUrl from '../../../utils/validate-url';

import showError from '../../../utils/show-error';

import stringify from '../../../utils/stringify';

class ContactEditDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: null
    }
  }

  firstInput = React.createRef();

  onOpened = () => {
    const i = this.firstInput.current;
    if (i.value === '') {
      i.focus();
    }
  };

  hide = () => {
    const {afterHide, toggleUiProp} = this.props;
    toggleUiProp('contactEdit');
    afterHide();
  };

  changed = (e, prop) => {
    const {setContact} = this.props;
    const val = e.target.value;
    setContact(prop, val);
  };

  save = () => {
    this.setState({errors: null});

    const {user} = this.props;
    const {contact} = user.draft;

    const {email, phone, website} = contact;

    if (email !== '') {
      if (!validateEmail(email)) {
        this.setState({errors: {email: 'Please enter a valid email address'}});
        return;
      }
    }

    if (phone !== '') {
      const p = parsePhoneNumberFromString(phone);
      if (!p || !p.isPossible()) {
        this.setState({errors: {phone: 'Please enter a valid international phone number.'}});
        return;
      }
    }

    if (website !== '') {
      if (!validateUrl(website)) {
        this.setState({errors: {website: 'Please enter a valid website address'}});
        return;
      }
    }

    const {afterSave, saveDraft, saveDraftDone, saveDraftError, toggleUiProp} = this.props;
    saveDraft().then((newData) => {
      toggleUiProp('contactEdit');
      saveDraftDone(newData);
    }).catch(err => {
      saveDraftError();
      showError(String(err));
    });

    afterSave();
  };

  render() {
    const {user} = this.props;
    const {contact, contactTemp} = user.draft;
    const changed = stringify(contact) !== stringify(contactTemp);

    const {email, phone, address, website} = contact;
    const {errors} = this.state;

    return (
      <>
        <Modal show className="drawer" backdropClassName="drawer-backdrop" backdrop="static" onHide={this.hide}
               onEntered={this.onOpened}>
          <Modal.Header closeButton>
            <Modal.Title>Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="contact-edit-dialog-content">

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <span className="prop-name">Email</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="email address" value={email} maxLength={50} type="email" onChange={(e) => {
                  this.changed(e, 'email')
                }} ref={this.firstInput} isInvalid={errors && errors.email} spellCheck={false}/>

                {errors && errors.email && (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                )}
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <span className="prop-name">Phone</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="+1-202-555-0166" value={phone} maxLength={30} type="tel" onChange={(e) => {
                  this.changed(e, 'phone')
                }} isInvalid={errors && errors.phone} spellCheck={false}/>

                {errors && errors.phone && (
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                )}
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <span className="prop-name">Website</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="https://" value={website} maxLength={60} type="text" onChange={(e) => {
                  this.changed(e, 'website')
                }} isInvalid={errors && errors.website} spellCheck={false}/>

                {errors && errors.website && (
                  <Form.Control.Feedback type="invalid">
                    {errors.website}
                  </Form.Control.Feedback>
                )}
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <span className="prop-name">Address</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="street address" value={address} maxLength={140} type="text" onChange={(e) => {
                  this.changed(e, 'address')
                }} spellCheck={false}/>
              </InputGroup>

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hide}>
              <FormattedMessage id="g.cancel"/>
            </Button>
            <Button variant="primary" onClick={this.save} disabled={!changed || user.saving}>
              <FormattedMessage id="g.save"/> {user.saving && '...'}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

ContactEditDialog.defaultProps = {
  afterHide: () => {
  },
  afterSave: () => {
  }
};

ContactEditDialog.propTypes = {
  user: PropTypes.shape({
    draft: PropTypes.shape({
      contact: PropTypes.instanceOf(Object),
      contactTemp: PropTypes.instanceOf(Object)
    }).isRequired
  }).isRequired,
  toggleUiProp: PropTypes.func.isRequired,
  setContact: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  saveDraftDone: PropTypes.func.isRequired,
  saveDraftError: PropTypes.func.isRequired,
  afterHide: PropTypes.func,
  afterSave: PropTypes.func
};

export default ContactEditDialog;
