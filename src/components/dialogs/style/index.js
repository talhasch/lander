import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, Form, Row, Col} from 'react-bootstrap';

import {injectIntl} from 'react-intl';

import bgImages from '../../../data/bg-images'

class StyleDialog extends Component {
  cancel = () => {
    const {onCancel} = this.props;

    onCancel();
  };

  save = () => {
    const {onSave} = this.props;

    onSave();
  };

  blurChanged = (e) => {
    console.log(e.target.value)
  };

  render() {
    const {onHide, user} = this.props;

    const {bg} = user.privateData

    return (
      <>
        <Modal show className="drawer" backdropClassName="drawer-backdrop" onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Style</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="style-dialog-content">
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label><Form.Check type="checkbox" checked/> Background Image</Form.Label>
                    <div className="bg-image-list">
                      {bgImages.map(i => <div key={i.name} className="image-item"
                                              style={{backgroundImage: `url(${i.url})`}}>
                        <div className="image-title">{i.title}</div>
                      </div>)}
                    </div>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Background Color</Form.Label>
                    <Form.Control type="text"/>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Blur</Form.Label>
                    <Form.Control type="number" min={0} max={10} value={bg.blur} onChange={this.blurChanged}/>
                    <Form.Text className="text-muted">
                      Should be between 0-10
                    </Form.Text>
                  </Form.Group>
                </Form.Row>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.save}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.cancel}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

StyleDialog.defaultProps = {
  visible: false,
  onCancel: () => {
  },
  onSave: () => {
  }
};

StyleDialog.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onSave: PropTypes.func
};

export default injectIntl(StyleDialog)