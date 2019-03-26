import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, Form} from 'react-bootstrap';

import {FormattedMessage} from 'react-intl';

import showError from '../../../utils/show-error';

class NameEditDialog extends Component {

  componentDidMount() {
    document.getElementById('name-txt').focus();
  }

  hide = () => {
    const {afterHide, toggleUiProp} = this.props;
    toggleUiProp('nameEdit');
    afterHide();
  };

  textChanged = (e) => {
    const {setName} = this.props;
    const val = e.target.value;
    setName(val);
  };

  save = () => {
    const {afterSave, saveDraft, saveDraftDone, saveDraftError, toggleUiProp} = this.props;
    saveDraft().then((newData) => {
      toggleUiProp('nameEdit');
      saveDraftDone(newData);
    }).catch(err => {
      saveDraftError();
      showError(String(err));
    });

    afterSave();
  };

  render() {
    const {user} = this.props;
    const {name, nameTemp} = user.draft;
    const changed = name !== nameTemp;

    return (
      <>
        <Modal show className="drawer" backdropClassName="drawer-backdrop" onHide={this.hide}>
          <Modal.Header closeButton>
            <Modal.Title>Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="name-edit-dialog-content">
              <Form.Group>
                <Form.Control id="name-txt" maxLength={30} value={name} onChange={this.textChanged}/>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hide}>
              <FormattedMessage id="g.cancel"/>
            </Button>
            <Button variant="primary" onClick={this.save} disabled={!changed || name.trim() === '' || user.saving}>
              <FormattedMessage id="g.save"/> {user.saving && '...'}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

NameEditDialog.defaultProps = {
  afterHide: () => {
  },
  afterSave: () => {
  }
};

NameEditDialog.propTypes = {
  user: PropTypes.shape({
    draft: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  toggleUiProp: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  saveDraftDone: PropTypes.func.isRequired,
  saveDraftError: PropTypes.func.isRequired,
  afterHide: PropTypes.func,
  afterSave: PropTypes.func
};

export default NameEditDialog;