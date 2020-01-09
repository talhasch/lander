import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button} from 'react-bootstrap';

import {_t} from '../../../i18n';


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
          {_t('g.are-you-sure')}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.cancel}>
            {_t('g.cancel')}
          </Button>
          <Button variant="primary" onClick={this.confirm}>
            {_t('g.confirm')}
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
