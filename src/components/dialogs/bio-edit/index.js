import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, Form, Alert} from 'react-bootstrap';

import {injectIntl, FormattedMessage} from 'react-intl';
import stringify from "../../../utils/stringify";

class BioEditDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      saveErr: '',
      saved: false
    };
  }

  componentDidMount() {
    this.mounted = true;
  };

  componentWillUnmount() {
    this.mounted = false;
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
    const {afterSave, saveDraft} = this.props;
    saveDraft().then(() => {
      this.setState({saved: true});
      setTimeout(() => {
        if (this.mounted) {
          this.setState({saved: false});
        }
      }, 3000);
    }).catch(err => {
      this.setState({saveErr: String(err)});
    });

    afterSave();
  };

  render() {
    const {saved, saveErr} = this.state;

    const {intl, user} = this.props;
    const {bio, bioTemp} = user.draft;
    const changed = stringify(bio) !== stringify(bioTemp);

    return (
      <>
        <Modal show className="drawer" backdropClassName="drawer-backdrop" onHide={this.hide}>
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage id="account-edit.title"/></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="bio-edit-dialog-content">
              {saved &&
              <Alert variant="success"><FormattedMessage id="g.saved"/></Alert>
              }
              {saveErr &&
              <Alert variant="danger" onClose={() => {
                this.setState({saveErr: ''});
              }}>{saveErr}</Alert>
              }
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Edit your longer description below</Form.Label>
                  <Form.Control as="textarea" rows="10" value={bio} onChange={this.textChanged}/>
                </Form.Group>
              </Form>
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
  intl: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.shape({
    draft: PropTypes.shape({
      bio: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  toggleUiProp: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  setBio: PropTypes.func.isRequired,
  afterHide: PropTypes.func,
  afterSave: PropTypes.func
};

export default injectIntl(BioEditDialog)