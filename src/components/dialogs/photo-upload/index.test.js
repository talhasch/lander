import React from 'react';
import ReactDOM from 'react-dom';

import PhotoUploadDialog from './index';

it('Render dialog', () => {
  const props = {};

  const div = document.createElement('div');
  ReactDOM.render(<PhotoUploadDialog {...props} />, div);
});
