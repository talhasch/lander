import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../home';

import wrapWithIntl from '../../utils/test-helper';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(wrapWithIntl(<Home/>), div);
  ReactDOM.unmountComponentAtNode(div);
});
