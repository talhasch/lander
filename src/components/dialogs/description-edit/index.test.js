import React from 'react';
import ReactDOM from 'react-dom';

import wrapWithIntl from '../../../utils/test-helper';

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
  ReactDOM.render(wrapWithIntl(<BioEditDialog {...props} />), div);
});