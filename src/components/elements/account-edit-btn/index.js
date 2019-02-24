import React, {Component} from 'react';

import {penSvg} from '../../../svg';

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


AccountEditBtn.defaultProps = {};

AccountEditBtn.propTypes = {};

export default AccountEditBtn;