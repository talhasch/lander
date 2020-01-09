import React from 'react';
import ReactDOM from 'react-dom';

import BioEditDialog from './index';

it('Render dialog', () => {
  const props = {
    user: {
      draft: {
        bio: 'lorem ipsum dolor'
      }
    },
    toggleUiProp: () => {
    },
    setBio: () => {
    },
    saveDraft: () => {

    },
    saveDraftDone: () => {

    },
    saveDraftError: () => {

    }
  };

  const div = document.createElement('div');
  ReactDOM.render(<BioEditDialog {...props} />, div);
});
