import React, {Component} from 'react';

import {penSvg} from '../../../svg';

class AccountEditBtn extends Component {

  clicked = () => {
    console.log("aa")
  };

  render() {
    return <div onClick={this.clicked} className="edit-btn">{penSvg}</div>
  }
}


AccountEditBtn.defaultProps = {};

AccountEditBtn.propTypes = {};

export default AccountEditBtn;