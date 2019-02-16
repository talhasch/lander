import  {Component} from 'react';

import {injectIntl, FormattedMessage} from 'react-intl';

class Editor extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    return 'Editor'
  }
}


export default injectIntl(Editor)