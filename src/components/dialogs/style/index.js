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

  imageSet = (url) => {
    const {setBgImage} = this.props;
    setBgImage(url);
  };

  imageTickChanged = (e) => {
    if (e.target.checked) {
      this.imageSet('recover');
      return;
    }

    this.imageSet(null);
  };

  colorChanged = (e) => {
    let val = e.target.value;
    const {setBgColor} = this.props;

    setBgColor(val);
  };

  blurChanged = (e) => {
    let val = e.target.value;
    if (val === '' || /^(?:[0-9]|0[0-9]|10)$/.test(val)) {
      const {setBgBlur} = this.props;
      setBgBlur(val);
    }
  };

  render() {
    const {onHide, user} = this.props;
    const {bg} = user.privateData;

    const imageUrl = bg.image ? /^https?:\/\//.test(bg.image) ? bg.image : require(`../../../data/bg-images/${bg.image}`) : '';
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
                    <Form.Label><Form.Check type="checkbox" checked={!!bg.image}
                                            onChange={this.imageTickChanged}/> Background Image</Form.Label>
                    {bg.image &&
                    <div className="bg-image" style={{backgroundImage: `url(${imageUrl})`}}/>
                    }

                    {!bg.image &&
                      <div className="text-muted">Not set</div>
                    }
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Background Color</Form.Label>
                    <Form.Control type="text" value={bg.color} onChange={this.colorChanged}/>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Blur</Form.Label>
                    <Form.Control type="number" min={0} max={10} step={1} value={bg.blur} onChange={this.blurChanged}/>
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