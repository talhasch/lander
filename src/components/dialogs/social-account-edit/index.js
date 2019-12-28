import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, InputGroup, FormControl} from 'react-bootstrap';

import {FormattedMessage} from 'react-intl';

import showError from '../../../utils/show-error';

import stringify from '../../../utils/stringify';

import {accountTypes} from '../../../social';

class AccountEditDialog extends Component {
  firstInput = React.createRef();

  onOpened = () => {
    const i = this.firstInput.current;
    if (i.value === '') {
      i.focus();
    }
  };


  hide = () => {
    const {afterHide, toggleUiProp} = this.props;
    toggleUiProp('accountEdit');
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
      toggleUiProp('accountEdit');
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

    return (
      <>
        <Modal show className="drawer" backdropClassName="drawer-backdrop" backdrop="static" onHide={this.hide}
               onEntered={this.onOpened}>
          <Modal.Header closeButton>
            <Modal.Title>Social Accounts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="account-edit-dialog-content">
              {accountTypes.map((x, i) => {

                  const props = {
                    placeholder: x.placeholder,
                    disabled: user.saving,
                    value: accounts[x.id] || '',
                    onChange: (e) => {
                      this.changed(e, x.id)
                    }
                  };

                  if (i === 0) {
                    props['ref'] = this.firstInput;
                  }

                  return <InputGroup className="mb-3" key={x.id}>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <span className="network-name">{x.label}</span>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl {...props}/>
                  </InputGroup>
                }
              )}
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

AccountEditDialog.defaultProps = {
  afterHide: () => {
  },
  afterSave: () => {
  }
};

AccountEditDialog.propTypes = {
  user: PropTypes.shape({
    draft: PropTypes.shape({
      accounts: PropTypes.instanceOf(Object).isRequired
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

export default AccountEditDialog;
