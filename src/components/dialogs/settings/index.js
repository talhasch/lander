import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button} from 'react-bootstrap';

import {FormattedMessage, injectIntl} from 'react-intl';

import ConfirmDialog from '../confirm'

import {draftFile, publishedFile} from '../../../constants';

const blockstack = require('blockstack');

class SettingsDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      deleteConfirm: false,
      deleting: false
    }
  }

  hide = () => {
    const {afterHide, toggleUiProp} = this.props;
    toggleUiProp('settings');

    afterHide();
  };

  deleteClicked = () => {
    this.setState({deleteConfirm: true});
  };

  deleteConfirmed = async () => {
    this.setState({deleteConfirm: false, deleting: true});

    try {
      await blockstack.putFile(draftFile, '', {encrypt: true});
      await blockstack.putFile(publishedFile, '', {encrypt: false});
    } catch (e) {
      return;
    }

    localStorage.removeItem('flag1');

    const {logout, history} = this.props;
    logout();
    history.push('/');
  };

  deleteCancelled = () => {
    this.setState({deleteConfirm: false});
  };

  render() {
    const {deleteConfirm, deleting} = this.state;

    return (
      <>
        {deleteConfirm && <ConfirmDialog onCancel={this.deleteCancelled} onConfirm={this.deleteConfirmed}/>}
        <Modal show className="drawer" backdropClassName="drawer-backdrop" onHide={this.hide}>
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage id="settings.title"/></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="settings-dialog-content">

              <div className="delete-account">
                <Button variant="danger" onClick={this.deleteClicked} disabled={deleting}>
                  <FormattedMessage id="settings.delete"/> {deleting && '...'}
                </Button>
              </div>
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

SettingsDialog.defaultProps = {
  afterHide: () => {
  }
};

SettingsDialog.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  logout: PropTypes.func.isRequired,
  toggleUiProp: PropTypes.func.isRequired,
  afterHide: PropTypes.func,
};

export default injectIntl(SettingsDialog);