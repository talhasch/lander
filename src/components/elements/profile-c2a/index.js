import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import landerLogo from '../../../images/lander-512.png';

class ProfileC2a extends Component {
  render() {
    return (
      <Link to="/" className="profile-c2a">
        <img src={landerLogo} className="logo" alt="Logo"/>
        <span className="c2a-text">Get your free <span>Lander</span> page</span>
      </Link>
    )
  }
}


export default ProfileC2a;