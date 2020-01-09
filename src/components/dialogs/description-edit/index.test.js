import React from 'react';
import ReactDOM from 'react-dom';

import BioEditDialog from './index';

it('Render dialog', () => {
  const props = {
    user: {
      draft: {
        description: 'lorem ipsum dolor'
      }
    },
    toggleUiProp: () => {
    },
    setDescription: () => {
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
