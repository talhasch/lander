import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

import {injectIntl} from 'react-intl';

class Home extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button>Hellox</Button>
      </div>)
  }
}


export default injectIntl(Home)