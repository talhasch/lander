import React, {Component} from 'react';

import landerLogo from '../../../images/lander-512.png';

class ProfileC2a extends Component {
  render() {
    return (
      <a href="/" className="profile-c2a">
        <img src={landerLogo} className="logo" alt="Logo"/>
        <span className="c2a-text">Get your free <span>Lander</span> page</span>
      </a>
    )
  }
}


export default ProfileC2a;