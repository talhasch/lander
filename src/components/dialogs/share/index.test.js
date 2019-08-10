import React from 'react';
import ReactDOM from 'react-dom';

import wrapWithIntl from '../../../utils/test-helper';

import ShareDialog from './index';

it('Render dialog', () => {
  const props = {
    toggleUiProp: () => {

    },
    user: {
      username: 'foo'
    }
  };

  const div = document.createElement('div');
  ReactDOM.render(wrapWithIntl(<ShareDialog {...props} />), div);
});