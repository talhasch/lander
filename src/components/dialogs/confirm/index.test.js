import React from 'react';
import ReactDOM from 'react-dom';

import ConfirmDialog from './index';

it('Render dialog', () => {
  const props = {
    toggleUiProp: () => {
    }
  };

  const div = document.createElement('div');
  ReactDOM.render(<ConfirmDialog {...props} />, div);
});
