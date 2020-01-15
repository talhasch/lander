import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, InputGroup, FormControl, Form} from 'react-bootstrap';

import cryptoAddress from 'cryptaddress-validator';

import showError from '../../../utils/show-error';

import stringify from '../../../utils/stringify';

import {_t} from '../../../i18n';

class WalletEditDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: null
    }
  }

  hide = () => {
    const {user, afterHide, toggleUiProp} = this.props;
    if (user.saving) {
      return;
    }

    toggleUiProp('walletEdit');
    afterHide();
  };

  changed = (e, network) => {
    const {setWallet} = this.props;
    const val = e.target.value;
    setWallet(network, val);
  };

  save = () => {
    this.setState({errors: null});

    const {user} = this.props;
    const {wallets} = user.draft;

    const {bitcoin, ethereum} = wallets;

    if (bitcoin && !cryptoAddress('btc').test(bitcoin)) {
      this.setState({errors: {bitcoin: _t('wallet-edit-dialog.btc-error')}});
      return;
    }

    if (ethereum && !cryptoAddress('eth').test(ethereum)) {
      this.setState({errors: {ethereum: _t('wallet-edit-dialog.eth-error')}});
      return;
    }

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
    const {errors} = this.state;

    const {wallets, walletsTemp} = user.draft;

    const changed = stringify(wallets) !== stringify(walletsTemp);

    const {bitcoin, ethereum} = wallets;

    return (
      <>
        <Modal show className="drawer" backdropClassName="drawer-backdrop" backdrop="static" onHide={this.hide}>
          <Modal.Header closeButton>
            <Modal.Title>{_t('wallet-edit-dialog.title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="wallet-edit-dialog-content">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <span className="network-name">BTC</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="address" value={bitcoin} onChange={(e) => {
                  this.changed(e, 'bitcoin')
                }} isInvalid={errors && errors.bitcoin} spellCheck={false}/>
                {errors && errors.bitcoin && (
                  <Form.Control.Feedback type="invalid">
                    {errors.bitcoin}
                  </Form.Control.Feedback>
                )}
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <span className="network-name">ETH</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="address" value={ethereum} onChange={(e) => {
                  this.changed(e, 'ethereum')
                }} isInvalid={errors && errors.ethereum} spellCheck={false}/>
                {errors && errors.ethereum && (
                  <Form.Control.Feedback type="invalid">
                    {errors.ethereum}
                  </Form.Control.Feedback>
                )}
              </InputGroup>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hide}>
              {_t('g.cancel')}
            </Button>
            <Button variant="primary" onClick={this.save} disabled={!changed || user.saving}>
              {_t('g.save')} {user.saving && '...'}
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
      wallets: PropTypes.shape({
        bitcoin: PropTypes.string,
        ethereum: PropTypes.string
      }).isRequired
    }).isRequired
  }).isRequired,
  toggleUiProp: PropTypes.func.isRequired,
  setWallet: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  saveDraftDone: PropTypes.func.isRequired,
  saveDraftError: PropTypes.func.isRequired,
  afterHide: PropTypes.func,
  afterSave: PropTypes.func
};

export default WalletEditDialog;
