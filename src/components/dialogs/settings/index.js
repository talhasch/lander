import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button} from 'react-bootstrap';

import {injectIntl} from 'react-intl';

import ConfirmDialog from '../confirm'

class SettingsDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      deleteConfirm: false
    }
  }

  save = () => {
    const {onHide} = this.props;

    onHide();
  };

  cancel = () => {
    const {onHide} = this.props;

    onHide();
  };

  deleteClicked = () => {
    this.setState({deleteConfirm: true});
  };

  deleteCancelled = () => {
    this.setState({deleteConfirm: false});
  };


  render() {
    const {visible, onHide} = this.props;
    const {deleteConfirm} = this.state;

    return (
      <>
        <ConfirmDialog visible={deleteConfirm} onCancel={this.deleteCancelled}/>
        <Modal show={visible} className="drawer" backdropClassName="drawer-backdrop" onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="settings-dialog-content">

              <div className="delete-account">
                <Button variant="danger" onClick={this.deleteClicked}>Delete my Lander page</Button>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.save}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.cancel}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

SettingsDialog.defaultProps = {
  visible: false,
  onHide: () => {
  }
};

SettingsDialog.propTypes = {
  visible: PropTypes.bool,
  onHide: PropTypes.func
};

export default injectIntl(SettingsDialog)