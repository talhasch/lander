import React from 'react';
import WalletAccounts from './index';
import renderer from 'react-test-renderer';

import wrapWithIntl from '../../utils/test-helper';


it('in edit mode. no accounts provided. should show placeholder for all accounts', () => {
  const props = {
    editMode: true
  };

  const component = wrapWithIntl(<WalletAccounts {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('in edit mode. bitcoin provided.', () => {
  const props = {
    editMode: true,
    accounts: [{
      service: 'bitcoin',
      identifier: '1321321312321efwfwe12321'
    }]
  };

  const component = wrapWithIntl(<WalletAccounts {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('not in edit mode. no accounts provided. should render null', () => {
  const props = {};

  const component = wrapWithIntl(<WalletAccounts {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('not in edit mode. ethereum provided', () => {
  const props = {
    accounts: [{
      service: 'ethereum',
      identifier: '0x123123123213213'
    }]
  };

  const component = wrapWithIntl(<WalletAccounts {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
