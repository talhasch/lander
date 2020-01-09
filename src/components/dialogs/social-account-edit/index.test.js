import React from 'react';
import ReactDOM from 'react-dom';

import AccountEditDialog from './index';

it('Render dialog', () => {
  const props = {
    user: {
      draft: {
        accounts: {github: '', twitter: '', facebook: '', instagram: '', linkedIn: ''}
      }
    },
    toggleUiProp: () => {
    },
    setAccount: () => {
    },
    saveDraft: () => {

    },
    saveDraftDone: () => {

    },
    saveDraftError: () => {

    }
  };

  const div = document.createElement('div');
  ReactDOM.render(<AccountEditDialog {...props} />, div);
});
