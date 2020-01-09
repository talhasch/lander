import React from 'react';
import ReactDOM from 'react-dom';

import StyleDialog from './index';

it('Render dialog', () => {
  const props = {
    user: {
      draft: {
        bg: {
          image: 'wave.jpg',
          color: '#ccc',
          blur: 1
        },
        bgTemp: {
          image: 'new.jpg',
          color: '#ccc',
          blur: 2
        }
      },
      saving: false
    },
    ui: {
      imageSelect: false
    },
    toggleUiProp: () => {

    },
    saveDraft: () => {

    },
    saveDraftDone: () => {

    },
    saveDraftError: () => {

    }
  };

  const div = document.createElement('div');
  ReactDOM.render(<StyleDialog {...props} />, div);
});
