import React from 'react';
import ReactDOM from 'react-dom';

import wrapWithIntl from '../../../utils/test-helper';

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
  ReactDOM.render(wrapWithIntl(<AccountEditDialog {...props} />), div);
});