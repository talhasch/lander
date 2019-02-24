import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, Form} from 'react-bootstrap';

import {injectIntl, FormattedMessage} from 'react-intl';

class AccountEditDialog extends Component {

  hide = () => {
    const {afterHide, toggleUiProp} = this.props;
    toggleUiProp('accountEdit');
    afterHide();
  };

  dontShow = (e) => {
    const {toggleUiProp} = this.props;
    const val = e.target.checked;
    localStorage.setItem('skip-account-dialog', val ? '1' : '0');
    toggleUiProp('skipAccountDialog');
  };

  render() {
    return (
      <>
        <Modal show className="drawer" backdropClassName="drawer-backdrop" onHide={this.hide}>
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage id="style.title"/></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="account-edit-dialog-content">
              <p> Lander works connected to your account.</p>
              <p> Once you update your account on Blockstack Browser then it refresh automatically.</p>
              <p><Button variant="danger" href="http://localhost:8888/profiles" target="_blank" onClick={this.hide}>Go
                to Blockstack
                Browser</Button></p>
              <Form>
                <Form.Group controlId="dont-show">
                  <Form.Check type="checkbox" label="Don't show this again" onChange={this.dontShow}/>
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hide}>
              <FormattedMessage id="g.cancel"/>
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

AccountEditDialog.defaultProps = {
  afterHide: () => {
  }
};

AccountEditDialog.propTypes = {
  intl: PropTypes.instanceOf(Object).isRequired,
  toggleUiProp: PropTypes.func.isRequired,
  afterHide: PropTypes.func
};

export default injectIntl(AccountEditDialog)