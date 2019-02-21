import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {imageSvg} from '../../svg';

class ProfileImage extends Component {

  render() {
    const {image} = this.props;

    if (image && image.length > 0) {
      const imageUrl = image[0].contentUrl;
      return <div className="profile-image" style={{backgroundImage: `url('${imageUrl}')`}}/>
    }

    return <div className="profile-image">{imageSvg}</div>
  }
}


ProfileImage.defaultProps = {
  image: []
};

ProfileImage.propTypes = {
  image: PropTypes.arrayOf(PropTypes.shape({
    contentUrl: PropTypes.string.isRequired
  }))
};

export default ProfileImage;