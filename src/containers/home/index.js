import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

import {injectIntl} from 'react-intl';

class Home extends Component {

  constructor(props) {
    super(props);

    console.log(window.blockstack)
  }

  render() {
    return (
      <div>
        <Button>Hello</Button>
      </div>)
  }
}


export default injectIntl(Home)