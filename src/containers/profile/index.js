import {Component} from 'react';

import {injectIntl} from 'react-intl';

class Profile extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return 'Profile'
  }
}


export default injectIntl(Profile)