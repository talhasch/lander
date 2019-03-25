import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button, Modal} from 'react-bootstrap';

import AvatarEditor from 'react-avatar-editor';
import InputRange from 'react-input-range';

import * as blockStack from 'blockstack';

import showError from '../../../utils/show-error';

import random from '../../../utils/rnd';

const mimeType = 'image/jpeg';

class PhotoUploadDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      zoom: 1,
      uploading: false
    };

    this.editor = null;
  }

  hide = () => {
    const {afterHide, toggleUiProp} = this.props;
    toggleUiProp('photoUpload');
    afterHide();
  };

  uploadClicked = () => {
    document.querySelector('#image-upload').click();
  };

  fileChanged = (e) => {
    const file = e.target.files[0];
    this.setState({file, zoom: 1});
  };

  imageChanged = () => {
    if (!this.editor) {
      return;
    }

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      const canvas = this.editor.getImage();
      const img = canvas.toDataURL(mimeType);

      const {setPhoto} = this.props;
      setPhoto(img);
    }, 300);
  };

  zoomChanged = (zoom) => {
    this.setState({zoom}, () => {
      this.imageChanged();
    });
  };

  save = () => {
    if (!this.editor) {
      return;
    }

    const self = this;
    const canvas = this.editor.getImage();

    canvas.toBlob((blob) => {
      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        const fileName = `avatar-${random()}.jpg`;
        const fileContents = event.target.result;

        self.setState({uploading: true});
        blockStack.putFile(fileName, fileContents, {encrypt: false, contentType: mimeType}).then(r => {
          self.uploadSuccess(r);
        }).catch(() => {
          showError('Could not complete file upload');
        }).then(() => {
          self.setState({uploading: false});
        });
      };
      fileReader.readAsArrayBuffer(blob);
    }, mimeType);
  };

  uploadSuccess = (url) => {
    const {setPhoto, afterSave, saveDraft, saveDraftDone, saveDraftError, toggleUiProp} = this.props;

    setPhoto(url);
    saveDraft().then((newData) => {
      toggleUiProp('photoUpload');
      saveDraftDone(newData);
    }).catch(err => {
      saveDraftError();
      showError(String(err));
    });

    afterSave();
  };

  render() {
    const {file, zoom, uploading} = this.state;

    return (
      <>
        <Modal show className="drawer" backdropClassName="drawer-backdrop" onHide={this.hide}>
          <Modal.Header closeButton>
            <Modal.Title>Set Profile Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="photo-upload-dialog-content">
              <div className="select-btn">
                <Button variant="primary" onClick={this.uploadClicked}>Select from your device</Button>
                <input type="file" id="image-upload" accept="image/*" className="d-none" onChange={this.fileChanged}/>
              </div>
              {file &&
              <>
                <div className="avatar-editor">
                  <AvatarEditor
                    ref={(editor) => {
                      this.editor = editor
                    }}
                    image={file}
                    width={240}
                    height={240}
                    border={20}
                    borderRadius={120}
                    scale={zoom}
                    rotate={0}
                    onImageChange={this.imageChanged}
                    onPositionChange={this.imageChanged}
                    onMouseMove={this.imageChanged}
                    onImageReady={this.imageChanged}
                  />
                </div>
                <div className="zoom">
                  <div className="zoom-label">
                    Zoom
                  </div>
                  <div className="zoom-control">
                    <InputRange
                      maxValue={4}
                      minValue={1}
                      step={0.1}
                      formatLabel={() => ''}
                      value={zoom}
                      onChange={this.zoomChanged}/>
                  </div>
                </div>
              </>
              }

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hide}>Cancel</Button>
            <Button variant="primary" disabled={!file || uploading}
                    onClick={this.save}>Save {uploading ? '...' : ''}</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}


PhotoUploadDialog.defaultProps = {
  afterHide: () => {
  },
  afterSave: () => {
  }
};

PhotoUploadDialog.propTypes = {
  user: PropTypes.shape({
    draft: PropTypes.shape({
      bio: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  toggleUiProp: PropTypes.func.isRequired,
  setPhoto: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  saveDraftDone: PropTypes.func.isRequired,
  saveDraftError: PropTypes.func.isRequired,
  afterHide: PropTypes.func,
  afterSave: PropTypes.func
};

export default PhotoUploadDialog;