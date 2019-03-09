import React from 'react';
import ReactDOM from 'react-dom';

import wrapWithIntl from '../../../utils/test-helper';

import SettingsDialog from './index';

it('Render dialog', () => {
  const props = {
    history: {},
    logout: () => {
    },
    toggleUiProp: () => {

    }
  };

  const div = document.createElement('div');
  ReactDOM.render(wrapWithIntl(<SettingsDialog {...props} />), div);
});