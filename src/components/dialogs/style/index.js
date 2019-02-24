import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, Form, Col} from 'react-bootstrap';

import {injectIntl, FormattedMessage} from 'react-intl';

import ImageSelectDialog from '../image-select'

import {detectBgImageUrl} from '../../../helper';

import stringify from '../../../utils/stringify'

class StyleDialog extends Component {
  hide = () => {
    const {afterHide, toggleUiProp} = this.props;
    toggleUiProp('style');
    afterHide();
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

  toggleImageSelect = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('imageSelect');
  };

  imageSelected = (im) => {
    const {toggleUiProp, setBgImage} = this.props;
    // toggleUiProp('imageSelect');
    setBgImage(im);
  };

  render() {
    const {user, ui} = this.props;
    const {bg, bgTemp} = user.privateData;
    const changed = stringify(bg) !== stringify(bgTemp);

    return (
      <>
        {ui.imageSelect && <ImageSelectDialog onCancel={this.toggleImageSelect} onSelect={this.imageSelected}/>}
        <Modal show className="drawer" backdropClassName="drawer-backdrop" backdrop="static" onHide={this.hide}>
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage id="style.title"/></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="style-dialog-content">
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>
                      <Form.Check type="checkbox" checked={!!bg.image}
                                  onChange={this.imageTickChanged}/> <FormattedMessage id="style.bg-image"/>
                    </Form.Label>
                    {bg.image &&
                    <div className="bg-image" style={{backgroundImage: `url(${detectBgImageUrl(bg.image)})`}}/>
                    }

                    {!bg.image &&
                    <p className="text-muted"><FormattedMessage id="style.bg-image-empty"/></p>
                    }
                    <Button variant="outline-primary" size="sm" onClick={this.toggleImageSelect}><FormattedMessage
                      id="style.bg-image-select"/></Button> &nbsp;
                    <Button variant="outline-primary" size="sm"><FormattedMessage
                      id="style.bg-image-upload"/></Button>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label><FormattedMessage id="style.bg-color"/></Form.Label>
                    <Form.Control type="text" value={bg.color} onChange={this.colorChanged}/>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label><FormattedMessage id="style.bg-blur"/></Form.Label>
                    <Form.Control type="number" min={0} max={10} step={1} value={bg.blur} onChange={this.blurChanged}/>
                    <Form.Text className="text-muted">
                      <FormattedMessage id="style.bg-blur-hint"/>
                    </Form.Text>
                  </Form.Group>
                </Form.Row>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hide}>
              <FormattedMessage id="g.cancel"/>
            </Button>
            <Button variant="primary" onClick={this.save} disabled={!changed}>
              <FormattedMessage id="g.save"/>
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

StyleDialog.defaultProps = {
  afterHide: () => {
  },
  onSave: () => {
  }
};

const bgProps = PropTypes.shape({
  image: PropTypes.string,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  blur: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}).isRequired;

StyleDialog.propTypes = {
  user: PropTypes.shape({
    privateData: PropTypes.shape({
      bg: bgProps,
      bgTemp: bgProps
    }).isRequired
  }).isRequired,
  ui: PropTypes.shape({
    imageSelect: PropTypes.bool.isRequired
  }).isRequired,
  setBgImage: PropTypes.func,
  setBgColor: PropTypes.func,
  setBgBlur: PropTypes.func,
  toggleUiProp: PropTypes.func.isRequired,
  afterHide: PropTypes.func,
  onSave: PropTypes.func
};

export default injectIntl(StyleDialog)