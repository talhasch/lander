import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Form} from 'react-bootstrap';

import {twitterSvg, facebookSvg} from '../../../svg';
import makeUserUrl from "../../../helper/user-url";

class ShareDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tooltip: false
    }
  }

  cancel = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('share');
  };

  userUrl = () => {
    const {user} = this.props;
    return makeUserUrl(user.username);
  };

  twitterUrl = () => {
    const title = 'My personal home page';
    return `https://twitter.com/intent/tweet?url=${this.userUrl()}&text=${title}&via=landr_me`;
  };

  facebookUrl = () => {
    return `https://www.facebook.com/sharer.php?u=${this.userUrl()}`;
  };

  urlClicked = (e) => {
    e.target.select();
    document.execCommand('copy');
    e.target.blur();

    this.setState({tooltip: true});
  };

  render() {

    const {tooltip} = this.state;

    return (
      <>
        <Modal show onHide={this.cancel} size="md" className="share-dialog">
          <Modal.Header closeButton>
            <Modal.Title>Share</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="networks">
              <a className="network" target="_blank" rel="noopener noreferrer" href={this.twitterUrl()}>{twitterSvg}</a>
              <a className="network" target="_blank" rel="noopener noreferrer"
                 href={this.facebookUrl()}>{facebookSvg}</a>
            </div>
            <Form.Group>
              <Form.Control readOnly value={this.userUrl()} onClick={this.urlClicked}/>
              <Form.Text className="text-muted">
                You can use your public address above to share on other networks.
              </Form.Text>
              <div className="copied"> {tooltip && <span>Copied</span>}</div>
            </Form.Group>

          </Modal.Body>
        </Modal>
      </>
    )
  }
}

ShareDialog.defaultProps = {};

ShareDialog.propTypes = {
  toggleUiProp: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  })
};

export default ShareDialog;