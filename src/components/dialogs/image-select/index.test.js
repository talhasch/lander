import React from 'react';
import ReactDOM from 'react-dom';

import ImageSelectDialog from './index';

it('Render dialog', () => {
  const props = {
    onSelect: () => {
    }
  };

  const div = document.createElement('div');
  ReactDOM.render(<ImageSelectDialog {...props} />, div);
});
