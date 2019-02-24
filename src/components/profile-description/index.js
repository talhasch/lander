import React, {Component} from 'react';

import PropTypes from 'prop-types';

class ProfileDescription extends Component {

  render() {
    const {description, editMode} = this.props;

    let cls = `profile-description ${editMode ? 'edit-mode' : ''}`;

    if (description) {
      return <div className={cls}>{description}</div>
    }

    cls = `${cls} not-set`;

    return <div className={cls}>Your description goes here...</div>
  }
}


ProfileDescription.defaultProps = {
  editMode: false,
  description: ''
};

ProfileDescription.propTypes = {
  editMode: PropTypes.bool,
  description: PropTypes.string
};

export default ProfileDescription;