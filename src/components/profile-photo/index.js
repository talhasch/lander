import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {imageSvg, penSvg} from '../../svg';

class ProfilePhoto extends Component {

  editClicked = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('photoUpload');
  };

  render() {
    const {imageUrl, editMode} = this.props;

    const editOverlay = <div onClick={this.editClicked} className="edit-btn">{penSvg}</div>;

    if (imageUrl) {
      return <div className="profile-photo"
                  style={{backgroundImage: `url('${imageUrl}')`}}>{editMode && editOverlay}</div>
    }

    return <div className="profile-photo">{imageSvg} {editMode && editOverlay}</div>
  }
}


ProfilePhoto.defaultProps = {
  toggleUiProp: () => {
  },
  editMode: false,
  imageUrl: ''
};

ProfilePhoto.propTypes = {
  toggleUiProp: PropTypes.func,
  editMode: PropTypes.bool,
  imageUrl: PropTypes.string
};

export default ProfilePhoto;