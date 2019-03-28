import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button} from 'react-bootstrap';

import {FormattedMessage, injectIntl} from 'react-intl';

import ConfirmDialog from '../confirm'

import {putDraftFile, putPublishedFile, putFlagFile, deleteFlagLocal} from '../../../dbl';

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

    // placement is important !
    await putFlagFile('');
    await putPublishedFile('');
    await putDraftFile('');

    const {user} = this.props;
    deleteFlagLocal(user.username);
    localStorage.getItem('guide-tour-disable');

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
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired
};

export default injectIntl(SettingsDialog);