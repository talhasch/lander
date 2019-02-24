import React, {Component} from 'react';

import PropTypes from 'prop-types';

import AccountEditBtn from '../../components/elements/account-edit-btn' ;

import {imageSvg} from '../../svg';

class ProfileImage extends Component {

  render() {
    const {image, editMode} = this.props;

    const editOverlay = <AccountEditBtn {...this.props}/>;

    if (image && image.length > 0) {
      const imageUrl = image[0].contentUrl;
      return <div className="profile-image"
                  style={{backgroundImage: `url('${imageUrl}')`}}>{editMode && editOverlay}</div>
    }

    return <div className="profile-image">{imageSvg} {editMode && editOverlay}</div>
  }
}


ProfileImage.defaultProps = {
  editMode: false,
  image: []
};

ProfileImage.propTypes = {
  editMode: PropTypes.bool,
  image: PropTypes.arrayOf(PropTypes.shape({
    contentUrl: PropTypes.string.isRequired
  }))
};

export default ProfileImage;