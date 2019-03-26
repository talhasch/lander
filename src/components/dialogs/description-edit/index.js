import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, Form} from 'react-bootstrap';

import {FormattedMessage} from 'react-intl';

import showError from '../../../utils/show-error';

class DescriptionEditDialog extends Component {

  componentDidMount() {
    document.getElementById('description-txt').focus();
  }

  hide = () => {
    const {afterHide, toggleUiProp} = this.props;
    toggleUiProp('descriptionEdit');
    afterHide();
  };

  textChanged = (e) => {
    const {setDescription} = this.props;
    const val = e.target.value;
    setDescription(val);
  };

  save = () => {
    const {afterSave, saveDraft, saveDraftDone, saveDraftError, toggleUiProp} = this.props;
    saveDraft().then((newData) => {
      toggleUiProp('descriptionEdit');
      saveDraftDone(newData);
    }).catch(err => {
      saveDraftError();
      showError(String(err));
    });

    afterSave();
  };

  render() {
    const {user} = this.props;
    const {description, descriptionTemp} = user.draft;
    const changed = description !== descriptionTemp;

    return (
      <>
        <Modal show className="drawer" backdropClassName="drawer-backdrop" onHide={this.hide}>
          <Modal.Header closeButton>
            <Modal.Title>Short Description</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="description-edit-dialog-content">s
              <Form.Group>
                <Form.Control id="description-txt" as="textarea" rows="5" maxLength={60} value={description}
                              onChange={this.textChanged}/>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hide}>
              <FormattedMessage id="g.cancel"/>
            </Button>
            <Button variant="primary" onClick={this.save}
                    disabled={!changed || description.trim() === '' || user.saving}>
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
      description: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  toggleUiProp: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  saveDraftDone: PropTypes.func.isRequired,
  saveDraftError: PropTypes.func.isRequired,
  afterHide: PropTypes.func,
  afterSave: PropTypes.func
};

export default DescriptionEditDialog;