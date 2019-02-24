import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, Form} from 'react-bootstrap';

import {injectIntl, FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import stringify from "../../../utils/stringify";

class BioEditDialog extends Component {

  hide = () => {
    const {afterHide, toggleUiProp} = this.props;
    toggleUiProp('bioEdit');
    afterHide();
  };

  textChanged = (e) => {
    const {setBio} = this.props;
    const val = e.target.value;
    setBio(val);
  };

  render() {
    const {intl, user} = this.props;
    const {bio, bioTemp} = user.privateData;
    const changed = stringify(bio) !== stringify(bioTemp);

    return (
      <>
        <Modal show className="drawer" backdropClassName="drawer-backdrop" onHide={this.hide}>
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage id="account-edit.title"/></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="bio-edit-dialog-content">
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Edit your longer description below</Form.Label>
                  <Form.Control as="textarea" rows="10" value={bio} onChange={this.textChanged}/>
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hide}>
              <FormattedMessage id="g.cancel"/>
            </Button>
            <Button variant="primary" onClick={this.save} disabled={!changed}>
              <FormattedMessage id="g.save"/>
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

BioEditDialog.defaultProps = {
  afterHide: () => {
  }
};

BioEditDialog.propTypes = {
  intl: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.shape({
    privateData: PropTypes.shape({
      bio: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  toggleUiProp: PropTypes.func.isRequired,
  setBio: PropTypes.func.isRequired,
  afterHide: PropTypes.func
};

export default injectIntl(BioEditDialog)