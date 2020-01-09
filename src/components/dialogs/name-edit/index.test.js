import React from 'react';
import ReactDOM from 'react-dom';

import NameEditDialog from './index';

it('Render dialog', () => {
  const props = {
    user: {
      draft: {
        name: 'Foo Bar'
      }
    },
    toggleUiProp: () => {
    },
    setName: () => {
    },
    saveDraft: () => {

    },
    saveDraftDone: () => {

    },
    saveDraftError: () => {

    }
  };

  const div = document.createElement('div');
  ReactDOM.render(<NameEditDialog {...props} />, div);
});
