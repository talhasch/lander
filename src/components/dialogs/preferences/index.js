import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, Form} from 'react-bootstrap';

import {FormattedMessage, injectIntl} from 'react-intl';

import to from 'await-to-js';

import {UserPref} from '../../../model';

import {getUsername} from '../../../blockstack-config';

class PreferencesDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      directory: false,
      inProgress: false
    }
  }

  componentDidMount() {
    this.fetchPref().then();
  }

  fetchPref = async () => {

    this.setState({inProgress: true});

    const [err, resp] = await to(UserPref.fetchOwnList({sort: 'createdAt'}));

    this.setState({inProgress: false});

    if (err) {
      return;
    }

    if (resp.length === 1) {
      this.setState({directory: resp[0].attrs.directory});
    }
  };

  save = async () => {
    const {directory} = this.state;

    this.setState({inProgress: true});

    const [err, resp] = await to(UserPref.fetchOwnList({sort: 'createdAt'}));

    if (err) {
      this.setState({inProgress: false});
      return;
    }

    const pref = resp.length === 1 ? resp[0] : new UserPref();

    pref.update({
      username: getUsername(),
      directory
    });

    await to(pref.save());

    this.setState({inProgress: false});
  };

  directoryChanged = (e) => {
    this.setState({directory: e.target.checked});
  };

  hide = () => {
    const {afterHide, toggleUiProp} = this.props;
    toggleUiProp('preferences');

    afterHide();
  };

  render() {
    const {intl} = this.props;
    const {inProgress, directory} = this.state;

    return (
      <>
        <Modal show className="drawer" backdropClassName="drawer-backdrop" onHide={this.hide}>
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage id="preferences.title"/></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="preferences-dialog-content">
              <Form>
                <Form.Group controlId="form-directory">
                  <Form.Check type="checkbox" label={intl.formatMessage({id: 'preferences.directory-label'})}
                              checked={directory} onChange={this.directoryChanged}/>
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hide} disabled={inProgress}>
              <FormattedMessage id="g.cancel"/>
            </Button>
            <Button variant="primary" onClick={this.save} disabled={inProgress}>
              <FormattedMessage id="g.save"/> {inProgress && '...'}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

PreferencesDialog.defaultProps = {
  afterHide: () => {
  }
};

PreferencesDialog.propTypes = {
  toggleUiProp: PropTypes.func.isRequired,
  afterHide: PropTypes.func,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired
};

export default injectIntl(PreferencesDialog);