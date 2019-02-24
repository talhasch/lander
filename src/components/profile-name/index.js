import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {penSvg} from '../../svg';

class ProfileName extends Component {

  render() {
    const {name, editMode} = this.props;

    let cls = `profile-name ${editMode ? 'edit-mode' : ''}`;

    if (name) {
      return <div className={cls}>
        {name}

        <div className="edit-btn">{penSvg}</div>
      </div>
    }

    cls = `${cls} not-set`;

    return <div className={cls}>Your name goes here...</div>
  }
}


ProfileName.defaultProps = {
  editMode: false,
  name: ''
};

ProfileName.propTypes = {
  editMode: PropTypes.bool,
  name: PropTypes.string
};

export default ProfileName;