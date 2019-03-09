import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal} from 'react-bootstrap';

import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';

import images from '../../../data/bg-images'

class ImageSelectDialog extends Component {

  cancel = () => {
    const {onCancel} = this.props;

    onCancel();
  };

  clicked = (im) => {
    const {onSelect} = this.props;

    onSelect(im);
  };


  render() {
    const {onCancel} = this.props;

    return (
      <>
        <Modal show onHide={onCancel} size="lg" className="image-select-dialog">
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage id="image-select.title" /></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="image-select-dialog-content">
              <p className="licence-note"><FormattedHTMLMessage id="image-select.licence-note" /></p>
              <div className="image-list">
                {images.map(i => <div className="image-item" key={i.name} style={{backgroundImage: `url(${i.url})`}}
                                      onClick={() => {
                                        this.clicked(i.name)
                                      }}>
                  <div className="image-title">{i.title}</div>
                </div>)}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

ImageSelectDialog.defaultProps = {
  onCancel: () => {
  }
};

ImageSelectDialog.propTypes = {
  onCancel: PropTypes.func,
  onSelect: PropTypes.func.isRequired
};

export default ImageSelectDialog