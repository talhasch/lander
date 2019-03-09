import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button} from 'react-bootstrap';

import {FormattedMessage} from 'react-intl';


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
    return (
      <Modal show onHide={this.cancel}>
        <Modal.Body>
          <FormattedMessage id="g.are-you-sure"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.cancel}>
            <FormattedMessage id="g.cancel"/>
          </Button>
          <Button variant="primary" onClick={this.confirm}>
            <FormattedMessage id="g.confirm"/>
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

ConfirmDialog.defaultProps = {
  onConfirm: () => {
  },
  onCancel: () => {
  }
};

ConfirmDialog.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
};

export default ConfirmDialog;