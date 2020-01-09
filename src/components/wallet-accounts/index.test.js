import React from 'react';
import WalletAccounts from './index';
import renderer from 'react-test-renderer';

it('1- in edit mode. no accounts provided. should return null', () => {
  const props = {
    editMode: true
  };

  const component = <WalletAccounts {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('2- in edit mode. bitcoin provided.', () => {
  const props = {
    editMode: true,
    accounts: {bitcoin: '1321321312321efwfwe12321'}
  };

  const component = <WalletAccounts {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('3- not in edit mode. no accounts provided. should render null', () => {
  const props = {};

  const component = <WalletAccounts {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('4- not in edit mode. ethereum provided', () => {
  const props = {
    accounts: {
      ethereum: '0x123123123213213'
    }
  };

  const component = <WalletAccounts {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
