import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Form, Button, Modal} from 'react-bootstrap';

import AvatarEditor from 'react-avatar-editor';

import InputRange from 'react-input-range';

import * as blockStack from 'blockstack';

import ProfileImage from '../../profile-image';
import Spinner from '../../../components/elements/spinner';

import {dataModel} from '../../../store/user';

import showError from '../../../utils/show-error';

import {putDraftFile, putPublishedFile, putFlagFile, getFlagFile, setFlagLocal} from '../../../dbl';

class PhotoModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      zoom: 1,
      uploading: false
    };

    this.editor = null;
  }

  uploadClicked = () => {
    document.querySelector('#image-upload').click();
  };

  fileChanged = (e) => {
    const file = e.target.files[0];
    this.setState({file, zoom: 1});
  };

  save = () => {
    if (this.editor) {
      const mime = 'image/jpeg';
      const {onSuccess} = this.props;

      const self = this;

      const canvas = this.editor.getImage();

      canvas.toBlob((blob) => {
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
          const rnd = Math.random().toString(36).substring(7);
          const fileName = `avatar-${rnd}.jpg`;
          const fileContents = event.target.result;

          self.setState({uploading: true});
          blockStack.putFile(fileName, fileContents, {encrypt: false, contentType: mime}).then(r => {
            setTimeout(() => {
              onSuccess(r);
            }, 200);
          }).catch(() => {
            showError('Could not complete file upload');
          }).then(() => {
            self.setState({uploading: false});
          })
        };
        fileReader.readAsArrayBuffer(blob);
      }, mime)
    }
  };

  render() {
    const {onCancel} = this.props;
    const {file, zoom, uploading} = this.state;

    return <Modal show backdrop="static" onHide={onCancel}>
      <Modal.Body>
        <div className="welcome-photo-modal-content">
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
                  onChange={zoom => this.setState({zoom})}/>
              </div>
            </div>
          </>
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" disabled={!file || uploading}
                onClick={this.save}>Save {uploading ? '...' : ''}</Button>
      </Modal.Footer>
    </Modal>
  }
}

PhotoModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

class WelcomePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      name: '',
      description: '',
      photo: '',
      uploadWindow: false,
      creating: false,
      loaded: false
    }
  }

  componentDidMount() {
    const {history} = this.props;

    if (!blockStack.isUserSignedIn()) {
      history.push('/');
      return;
    }

    const userData = blockStack.loadUserData();

    getFlagFile().then(resp => {
      if (JSON.parse(resp) === 'ok') {
        setFlagLocal(userData.username, 'ok');
        history.push('/app/editor');
        return;
      }

      this.setState({loaded: true});
    });

    const {profile} = userData;

    if (profile.name) {
      this.setState({name: profile.name});
    }

    if (profile.description) {
      this.setState({description: profile.description});
    }

    if (profile.image && profile.image.length > 0) {
      const imageUrl = profile.image[0].contentUrl;
      this.setState({photo: imageUrl});
    }

    this.focusInput();
  }

  focusInput = () => {
    setTimeout(() => {
      const e = document.querySelector('.focus-on');
      if (e) {
        e.focus();
      }
    }, 400);
  };

  nameChanged = (e) => {
    this.setState({name: e.target.value});
  };

  next1 = () => {
    const {name} = this.state;
    if (!name.trim()) {
      this.focusInput();
      return;
    }

    this.setState({step: 2}, () => {
      this.focusInput();
    });
  };

  next2 = () => {
    const {description} = this.state;
    if (!description.trim()) {
      this.focusInput();
      return;
    }

    this.setState({step: 3});
  };

  back1 = () => {
    this.setState({step: 1}, () => {
      this.focusInput();
    });
  };

  back2 = () => {
    this.setState({step: 2}, () => {
      this.focusInput();
    });
  };

  descriptionChanged = (e) => {
    this.setState({description: e.target.value});
  };

  create = () => {
    const userData = blockStack.loadUserData();
    const {name, description, photo} = this.state;

    const data = dataModel();

    const newData = Object.assign({}, data, {name, description, photo});

    this.setState({creating: true});

    const prms1 = putDraftFile(newData);
    const prms2 = putPublishedFile(newData);

    return Promise.all([prms1, prms2]).then(() => {
      return putFlagFile('ok').then(() => {
        setFlagLocal(userData.username, 'ok');
        setTimeout(() => {
          window.location.href = '/app/editor'
        }, 200);
      });
    }).catch(() => {
      showError('Could not create your page. Please try again.');
    }).then(() => {
      this.setState({creating: false});
    })
  };

  render() {
    const {step, name, description, photo, creating, loaded, uploadWindow} = this.state;

    if (!loaded) {
      return <Spinner/>;
    }

    return (
      <>
        <div className="main-wrapper-welcome">
          <div className="inner-wrapper">
            <div className="section-header">
              <h1>Welcome</h1>
            </div>


            {step === 1 &&
            <>
              <div className="section-sub-header">
                Let's start building your page
              </div>

              <div className="welcome-form">
                <Form.Group controlId="formName">
                  <Form.Label className="text-muted">Your name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name here"
                    className="focus-on"
                    maxLength={50}
                    value={name}
                    onChange={this.nameChanged}
                    onKeyPress={
                      (e) => {
                        if (e.key === 'Enter') {
                          this.next1();
                        }
                      }
                    }
                  />
                </Form.Group>
              </div>
              <div className="form-buttons">
                <Button variant="primary" type="button" onClick={this.next1}>
                  Next
                </Button>
              </div>
            </>
            }

            {step === 2 &&
            <>
              <div className="section-sub-header">
                Tell your visitors a little about yourself
              </div>
              <div className="welcome-form">
                <Form.Group controlId="formDescription">
                  <Form.Label className="text-muted">Short description:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Describe yourself"
                    className="focus-on"
                    maxLength={100}
                    value={description}
                    onChange={this.descriptionChanged}
                    onKeyPress={
                      (e) => {
                        if (e.key === 'Enter') {
                          this.next2();
                        }
                      }
                    }
                  />
                  <Form.Text className="text-muted">
                    e.g. Time traveler and blogger
                  </Form.Text>
                </Form.Group>
              </div>
              <div className="form-buttons">
                <Button variant="secondary" type="button" className="btn-back" onClick={this.back1}>
                  Back
                </Button>
                <Button variant="primary" type="button" onClick={this.next2}>
                  Next
                </Button>
              </div>
            </>
            }
            {step === 3 &&
            <>
              <div className="section-sub-header">
                Set your profile image
              </div>
              <div className="set-profile-image">
                <ProfileImage imageUrl={photo}/>
                <Button variant="outline-primary" onClick={() => {
                  this.setState({uploadWindow: true});
                }}>Upload new photo</Button>
              </div>
              <div className="form-buttons">
                <Button variant="secondary" type="button" className="btn-back" disabled={creating} onClick={this.back2}>
                  Back
                </Button>
                <Button variant="primary" type="button" disabled={creating} onClick={this.create}>
                  Next {creating ? '...' : ''}
                </Button>
              </div>
              {uploadWindow &&
              <PhotoModal onCancel={() => {
                this.setState({uploadWindow: false});
              }} onSuccess={(url) => {
                this.setState({photo: url, uploadWindow: false});
              }}/>
              }
            </>
            }
          </div>
        </div>
      </>
    )
  }
}

export default WelcomePage;