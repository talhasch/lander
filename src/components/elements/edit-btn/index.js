import React, {Component} from 'react';

import {penSvg} from '../../../svg';
import PropTypes from "prop-types";

class EditBtn extends Component {
  render() {
    const {onClick} = this.props;
    return <div onClick={onClick} className="edit-btn">{penSvg}</div>
  }
}


EditBtn.defaultProps = {
  onClick: () => {

  }
};

EditBtn.propTypes = {
  onClick: PropTypes.func
};

export default EditBtn;