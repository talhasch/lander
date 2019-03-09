import React from 'react';
import ReactDOM from 'react-dom';

import wrapWithIntl from '../../../utils/test-helper';

import ImageSelectDialog from './index';

it('Render dialog', () => {
  const props = {
    onSelect: () => {
    }
  };

  const div = document.createElement('div');
  ReactDOM.render(wrapWithIntl(<ImageSelectDialog {...props} />), div);
});