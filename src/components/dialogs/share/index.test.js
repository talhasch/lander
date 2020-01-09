import React from 'react';
import ReactDOM from 'react-dom';

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
  ReactDOM.render(<ShareDialog {...props} />, div);
});
