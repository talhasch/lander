import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, InputGroup, FormControl} from 'react-bootstrap';

import {FormattedMessage} from 'react-intl';

import showError from '../../../utils/show-error';

import stringify from '../../../utils/stringify';

class ContactEditDialog extends Component {
  mailInput = React.createRef();

  onOpened = () => {
    const i = this.mailInput.current;
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

    return (
      <>
        <Modal show className="drawer" backdropClassName="drawer-backdrop" onHide={this.hide} onEntered={this.onOpened}>
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
                }} ref={this.mailInput}/>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <span className="prop-name">Phone</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="phone number" value={phone} maxLength={20} type="tel" onChange={(e) => {
                  this.changed(e, 'phone')
                }}/>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <span className="prop-name">Website</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="https://" value={website} maxLength={60} type="text" onChange={(e) => {
                  this.changed(e, 'website')
                }}/>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <span className="prop-name">Address</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="street address" value={address} maxLength={140} type="text" onChange={(e) => {
                  this.changed(e, 'address')
                }}/>
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
