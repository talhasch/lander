import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, Form} from 'react-bootstrap';

import {FormattedMessage} from 'react-intl';

import stringify from '../../../utils/stringify';

import showError from '../../../utils/show-error';

import {mDownSvg} from '../../../svg';

class BioEditDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showDoc: false
    }
  }

  componentDidMount() {
    document.getElementById('bio-txt').focus();
  }

  toggleDoc = () => {
    const {showDoc} = this.state;
    this.setState({showDoc: !showDoc})
  };

  hide = () => {
    const {afterHide, toggleUiProp} = this.props;
    toggleUiProp('bioEdit');
    afterHide();
  };

  textChanged = (e) => {
    const {setBio} = this.props;
    const val = e.target.value;
    setBio(val);
  };

  save = () => {
    const {afterSave, saveDraft, saveDraftDone, saveDraftError, toggleUiProp} = this.props;
    saveDraft().then((newData) => {
      toggleUiProp('bioEdit');
      saveDraftDone(newData);
    }).catch(err => {
      saveDraftError();
      showError(String(err));
    });

    afterSave();
  };

  render() {
    const {showDoc} = this.state;
    const {user} = this.props;
    const {bio, bioTemp} = user.draft;
    const changed = stringify(bio) !== stringify(bioTemp);

    return (
      <>
        <Modal show className="drawer" backdropClassName="drawer-backdrop" onHide={this.hide}>
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage id="bio.title"/></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="bio-edit-dialog-content">
              <Form.Group>
                <Form.Control as="textarea" rows="10" id="bio-txt" value={bio} onChange={this.textChanged}/>
              </Form.Group>
              <span className="md-note" onClick={this.toggleDoc}>{mDownSvg} Styling with Markdown is supported</span>
              {showDoc &&
              <div className="md-doc">
                <h3>Emphasis</h3>
                <pre>
                *This text will be italic*
                </pre>
                <h3>Bold</h3>
                <pre>
                **This text will be bold**
                </pre>
                <h3>Links</h3>
                <pre>
                [Lander](https://landr.me)<br/><br/>
                https://landr.me- automatic!
                </pre>
              </div>
              }
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

BioEditDialog.defaultProps = {
  afterHide: () => {
  },
  afterSave: () => {
  }
};

BioEditDialog.propTypes = {
  user: PropTypes.shape({
    draft: PropTypes.shape({
      bio: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  toggleUiProp: PropTypes.func.isRequired,
  setBio: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  saveDraftDone: PropTypes.func.isRequired,
  saveDraftError: PropTypes.func.isRequired,
  afterHide: PropTypes.func,
  afterSave: PropTypes.func
};

export default BioEditDialog;