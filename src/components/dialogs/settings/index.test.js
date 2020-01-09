import React from 'react';
import ReactDOM from 'react-dom';

import SettingsDialog from './index';

it('Render dialog', () => {
  const props = {
    history: {},
    logout: () => {
    },
    toggleUiProp: () => {

    },
    user: {
      username: 'foo'
    }
  };

  const div = document.createElement('div');
  ReactDOM.render(<SettingsDialog {...props} />, div);
});
