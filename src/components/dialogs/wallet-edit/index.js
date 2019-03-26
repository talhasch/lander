import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, InputGroup, FormControl} from 'react-bootstrap';

import {FormattedMessage} from 'react-intl';

import showError from '../../../utils/show-error';

import stringify from '../../../utils/stringify';

class WalletEditDialog extends Component {
  hide = () => {
    const {afterHide, toggleUiProp} = this.props;
    toggleUiProp('walletEdit');
    afterHide();
  };

  changed = (e, network) => {
    const {setAccount} = this.props;
    const val = e.target.value;
    setAccount(network, val);
  };

  save = () => {
    const {afterSave, saveDraft, saveDraftDone, saveDraftError, toggleUiProp} = this.props;
    saveDraft().then((newData) => {
      toggleUiProp('walletEdit');
      saveDraftDone(newData);
    }).catch(err => {
      saveDraftError();
      showError(String(err));
    });

    afterSave();
  };

  render() {
    const {user} = this.props;
    const {accounts, accountsTemp} = user.draft;
    const changed = stringify(accounts) !== stringify(accountsTemp);

    const {bitcoin, ethereum} = accounts;

    return (
      <>
        <Modal show className="drawer" backdropClassName="drawer-backdrop" onHide={this.hide}>
          <Modal.Header closeButton>
            <Modal.Title>Wallet Accounts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="wallet-edit-dialog-content">


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

WalletEditDialog.defaultProps = {
  afterHide: () => {
  },
  afterSave: () => {
  }
};

WalletEditDialog.propTypes = {
  user: PropTypes.shape({
    draft: PropTypes.shape({
      wallets: PropTypes.instanceOf(Object).isRequired
    }).isRequired
  }).isRequired,
  toggleUiProp: PropTypes.func.isRequired,
  setAccount: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  saveDraftDone: PropTypes.func.isRequired,
  saveDraftError: PropTypes.func.isRequired,
  afterHide: PropTypes.func,
  afterSave: PropTypes.func
};

export default WalletEditDialog;