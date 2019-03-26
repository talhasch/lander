import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, InputGroup, FormControl} from 'react-bootstrap';

import {FormattedMessage} from 'react-intl';

import showError from '../../../utils/show-error';
import stringify from "../../../utils/stringify";

class DescriptionEditDialog extends Component {
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
    console.log(user)
    const changed = stringify(accounts) !== stringify(accountsTemp);

    const {github, twitter, facebook, instagram, linkedIn} = accounts;

    return (
      <>
        <Modal show className="drawer" backdropClassName="drawer-backdrop" onHide={this.hide}>
          <Modal.Header closeButton>
            <Modal.Title>Social Accounts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="account-edit-dialog-content">


              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <span className="network-name">github.com/</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="username" value={github} onChange={(e) => {
                  this.changed(e, 'github')
                }}/>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <span className="network-name">twitter.com/</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="username" value={twitter} onChange={(e) => {
                  this.changed(e, 'twitter')
                }}/>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <span className="network-name">facebook.com/</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="username" value={facebook} onChange={(e) => {
                  this.changed(e, 'facebook')
                }}/>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <span className="network-name">instagram.com/</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="username" value={instagram} onChange={(e) => {
                  this.changed(e, 'instagram')
                }}/>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <span className="network-name">linkedin.com/in/</span>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="username" value={linkedIn} onChange={(e) => {
                  this.changed(e, 'linkedIn')
                }}/>
              </InputGroup>
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

DescriptionEditDialog.defaultProps = {
  afterHide: () => {
  },
  afterSave: () => {
  }
};

DescriptionEditDialog.propTypes = {
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

export default DescriptionEditDialog;