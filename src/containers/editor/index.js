import {Component} from 'react';

import {injectIntl} from 'react-intl';

class Editor extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    // persist local
    // if not exists local
    // check remote file
    // if remote file not exists
    // == means first time

    /*
    const user = window.blockstack.loadUserData();

    console.log(user)
    window.blockstack.getFile('a.txt').then(resp => {

    });
    */
  }

  render() {
    return 'Editor'
  }
}


export default injectIntl(Editor)