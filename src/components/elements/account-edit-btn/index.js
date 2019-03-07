import React, {Component} from 'react';

import {penSvg} from '../../../svg';
import PropTypes from "prop-types";

class AccountEditBtn extends Component {

  buttonClicked = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('accountEdit');
  };

  render() {
    const {ui} = this.props;

    if (ui.skipAccountDialog) {
      return <a href="http://localhost:8888/profiles" target="_blank" rel="noopener noreferrer"
                className="edit-btn">{penSvg}</a>
    }
    return <div onClick={this.buttonClicked} className="edit-btn">{penSvg}</div>
  }
}


AccountEditBtn.defaultProps = {
  ui: {
    skipAccountDialog: false
  }
};

AccountEditBtn.propTypes = {
  ui: PropTypes.shape({
    skipAccountDialog: PropTypes.bool
  })
};

export default AccountEditBtn;