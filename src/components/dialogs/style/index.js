import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, Form, Col} from 'react-bootstrap';

import {injectIntl, FormattedMessage} from 'react-intl';

import ImageSelectDialog from '../image-select'

import detectBgImageUrl from '../../../helper/detect-bg-image-url';

import showError from '../../../utils/show-error';

import stringify from '../../../utils/stringify'

class StyleDialog extends Component {
  componentDidMount() {
    this.mounted = true;
  };

  componentWillUnmount() {
    this.mounted = false;
  };

  hide = () => {
    const {afterHide, toggleUiProp} = this.props;
    toggleUiProp('style');
    afterHide();
  };

  save = () => {
    const {afterSave, saveDraft, toggleUiProp} = this.props;
    saveDraft().then(() => {
      toggleUiProp('style');
    }).catch(err => {
      showError(String(err));
    });

    afterSave();
  };

  imageSet = (url) => {
    const {setBgImage} = this.props;
    setBgImage(url)
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

  uploadClicked = () => {
    document.querySelector('#image-upload').click();
  };

  fileChanged = (e) => {
    const {setBgImage} = this.props;
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (m) => {
      const imageContents = m.target.result;
      setBgImage(imageContents);
    };
    reader.readAsDataURL(file);
  };

  imageSelected = (im) => {
    const {toggleUiProp, setBgImage} = this.props;
    toggleUiProp('imageSelect');
    setBgImage(im);
  };

  render() {
    const {user, ui} = this.props;
    const {bg, bgTemp} = user.draft;
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
                    <Button variant="outline-primary" size="sm" onClick={this.uploadClicked}><FormattedMessage
                      id="style.bg-image-upload"/></Button>
                  </Form.Group>
                  <input type="file" id="image-upload" accept="image/*" className="d-none" onChange={this.fileChanged}/>
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
            <Button variant="primary" onClick={this.save} disabled={!changed || user.saving}>
              <FormattedMessage id="g.save"/> {user.saving && '...'}
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
  afterSave: () => {
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
    draft: PropTypes.shape({
      bg: bgProps,
      bgTemp: bgProps
    }).isRequired,
    saving: PropTypes.bool.isRequired
  }).isRequired,
  ui: PropTypes.shape({
    imageSelect: PropTypes.bool.isRequired
  }).isRequired,
  setBgImage: PropTypes.func,
  setBgColor: PropTypes.func,
  setBgBlur: PropTypes.func,
  toggleUiProp: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  afterHide: PropTypes.func,
  afterSave: PropTypes.func
};

export default injectIntl(StyleDialog)