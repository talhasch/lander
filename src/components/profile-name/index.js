import React, {Component} from 'react';

import PropTypes from 'prop-types';

class ProfileName extends Component {

  render() {
    const {name} = this.props;

    if (name) {

      return <div className="profile-name">{name}</div>
    }

    return <div className="profile-name empty">Your name goes here...</div>
  }
}


ProfileName.defaultProps = {
  name: ''
};

ProfileName.propTypes = {
  name: PropTypes.string
};

export default ProfileName;