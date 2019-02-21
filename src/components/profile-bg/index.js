import React, {Component} from 'react';

import PropTypes from 'prop-types';


class ProfileBg extends Component {

  render() {
    const {bg} = this.props;


    const {image, color, blur} = bg;

    const imageUrl = require(`../../data/bg-images/${image}`);


    const left = blur * 2;
    const width = left * 2;

    const style = {
      backgroundColor: color,
      backgroundImage: `url('${imageUrl}')`,
      width: `calc(100% + ${width}px)`,
      height: `calc(100% + ${width}px)`,
      left: `-${left}px`,
      top: `-${left}px`,
      filter: `blur(${blur}px)`
    };

    return <div className="bg" style={style}/>
  }
}


ProfileBg.defaultProps = {};

ProfileBg.propTypes = {
  bg: PropTypes.shape({
    image: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    blur: PropTypes.number.isRequired
  })
};

export default ProfileBg;