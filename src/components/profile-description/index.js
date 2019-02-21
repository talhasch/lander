import React, {Component} from 'react';

import PropTypes from 'prop-types';

class ProfileDescription extends Component {

  render() {
    const {description} = this.props;

    if (description) {
      return <div className="profile-description">{description}</div>
    }

    return <div className="profile-description empty">Your description goes here...</div>
  }
}


ProfileDescription.defaultProps = {
  description: ''
};

ProfileDescription.propTypes = {
  description: PropTypes.string
};

export default ProfileDescription;