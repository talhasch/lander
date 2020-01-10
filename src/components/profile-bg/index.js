import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Color from 'color';

import detectBgImageUrl from '../../helper/detect-bg-image-url';

import {b64EncodeUnicode} from '../../utils/base64';

class ProfileBg extends Component {

  render() {
    const {bg} = this.props;

    const {image} = bg;
    let {color, blur} = bg;

    // In editing mode blur can be passed to store as empty string
    if (blur === '') {
      blur = 0
    }

    // Check color is valid
    try {
      Color(color);
    } catch (e) {
      color = 'transparent';
    }

    const left = blur * 2;
    const width = left * 2;

    const style = {
      backgroundColor: color,
      width: `calc(100% + ${width}px)`,
      height: `calc(100% + ${width}px)`,
      left: `-${left}px`,
      top: `-${left}px`,
      filter: `blur(${blur}px)`
    };

    if (image) {
      const imageUrl = detectBgImageUrl(image);

      let url = imageUrl.indexOf('https://') === 0 ? `https://landr.me/i-p/${b64EncodeUnicode(imageUrl)}` : imageUrl;

      style.backgroundImage = `url('${url}')`;
    }

    return <div className="bg" style={style}/>
  }
}


ProfileBg.defaultProps = {};

ProfileBg.propTypes = {
  bg: PropTypes.shape({
    image: PropTypes.string,
    color: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    blur: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  })
};

export default ProfileBg;
