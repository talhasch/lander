import React, {Component} from 'react';

import ProfilePage from '../../components/pages/profile';

class ProfileContainer extends Component {

  render() {
    return <ProfilePage {...this.props} />;
  }
}


export default ProfileContainer;