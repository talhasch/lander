import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button} from 'react-bootstrap';

import makeUserUrl from '../../../../../helper/user-url';
import showError from '../../../../../utils/show-error';

import {qrCodeSvg, penSvg} from '../../../../../svg';

class PublishToolbar extends Component {

  publish = () => {
    const {publish, publishDone, publishError} = this.props;
    publish().then((newData) => {
      publishDone(newData);
    }).catch(err => {
      publishError();
      showError(String(err));
    });
  };

  render() {
    const {user} = this.props;
    const suffix = user.alias || user.username;
    const userUrl = makeUserUrl(suffix);

    if (!user.published) {
      return <div className="publish-toolbar">
        <div className="info-content">
          <div className="info-msg">Your Lander page hasn't published yet</div>
          <div className="info-controls">
            <Button variant="primary" onClick={this.publish}
                    disabled={user.publishing}>Publish{user.publishing && '...'}</Button>
          </div>
        </div>
      </div>
    }

    if (user.published && user.draft.updated !== user.published.updated) {
      return <div className="publish-toolbar">
        <div className="info-content">
          <div className="info-msg">Last change you've made hasn't published</div>
          <div className="info-controls">
            <Button variant="primary" onClick={this.publish}
                    disabled={user.publishing}>Publish{user.publishing && '...'}</Button>
          </div>
        </div>
      </div>;
    }

    return <div className="publish-toolbar">
      <span className="btn-qr">{qrCodeSvg}</span>
      <a className="user-address" href={userUrl} target="_blank" rel="noopener noreferrer">{userUrl}</a>
      <span className="btn-edit-alias" onClick={() => {
        const {toggleUiProp} = this.props;
        toggleUiProp('alias')
      }}>{penSvg}</span>
    </div>;
  }
}

PublishToolbar.defaultProps = {};

PublishToolbar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    alias: PropTypes.string,
    draft: PropTypes.shape({
      updated: PropTypes.string.isRequired
    }),
    published: PropTypes.shape({
      updated: PropTypes.string.isRequired
    }),
    publishing: PropTypes.bool.isRequired
  }),
  toggleUiProp: PropTypes.func.isRequired
};

export default PublishToolbar;