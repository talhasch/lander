import React from 'react';
import ReactDOM from 'react-dom';

import wrapWithIntl from '../../../utils/test-helper';

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
  ReactDOM.render(wrapWithIntl(<BioEditDialog {...props} />), div);
});