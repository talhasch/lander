import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button} from 'react-bootstrap';

import {injectIntl} from 'react-intl';


class ConfirmDialog extends Component {

  cancel = () => {
    const {onCancel} = this.props;

    onCancel();
  };


  confirm = () => {
    const {onConfirm} = this.props;

    onConfirm();
  };

  render() {
    const {visible} = this.props;
    return (
      <Modal show={visible} onHide={this.cancel}>
        <Modal.Body>
          Are you sure?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.cancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.confirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

ConfirmDialog.defaultProps = {
  visible: false,
  onConfirm: () => {
  },
  onCancel: () => {
  }
};

ConfirmDialog.propTypes = {
  visible: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
};

export default injectIntl(ConfirmDialog)