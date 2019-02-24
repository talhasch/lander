import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button} from 'react-bootstrap';

import {FormattedMessage, injectIntl} from 'react-intl';

import ConfirmDialog from '../confirm'

const blockstack = require('blockstack');

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

  hide = () => {
    const {afterHide, toggleUiProp} = this.props;
    toggleUiProp('settings');

    afterHide();
  };

  deleteClicked = () => {
    blockstack.deleteFile('lander-private-f').then(resp => {

    })
  };

  deleteCancelled = () => {
    this.setState({deleteConfirm: false});
  };


  render() {
    const {deleteConfirm} = this.state;

    return (
      <>
        <ConfirmDialog visible={deleteConfirm} onCancel={this.deleteCancelled}/>
        <Modal show className="drawer" backdropClassName="drawer-backdrop" onHide={this.hide}>
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
              <FormattedMessage id="g.cancel"/>
            </Button>
            <Button variant="primary" onClick={this.hide}>
              <FormattedMessage id="g.save"/>
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

SettingsDialog.defaultProps = {
  afterHide: () => {
  }
};

SettingsDialog.propTypes = {
  toggleUiProp: PropTypes.func.isRequired,
  afterHide: PropTypes.func
};

export default injectIntl(SettingsDialog)