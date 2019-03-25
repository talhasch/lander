import React from 'react';
import ReactDOM from 'react-dom';

import wrapWithIntl from '../../../utils/test-helper';

import PhotoUploadDialog from './index';

it('Render dialog', () => {
  const props = {};

  const div = document.createElement('div');
  ReactDOM.render(wrapWithIntl(<PhotoUploadDialog {...props} />), div);
});