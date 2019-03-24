import React, {Component} from 'react';

import PropTypes from 'prop-types';

import AccountEditBtn from '../../components/elements/account-edit-btn' ;

import {imageSvg} from '../../svg';

class ProfileImage extends Component {

  render() {
    const {imageUrl, editMode} = this.props;

    const editOverlay = <AccountEditBtn {...this.props}/>;

    if (imageUrl) {
      return <div className="profile-image"
                  style={{backgroundImage: `url('${imageUrl}')`}}>{editMode && editOverlay}</div>
    }

    return <div className="profile-image">{imageSvg} {editMode && editOverlay}</div>
  }
}


ProfileImage.defaultProps = {
  editMode: false,
  imageUrl: ''
};

ProfileImage.propTypes = {
  editMode: PropTypes.bool,
  imageUrl: PropTypes.string
};

export default ProfileImage;