import React from 'react';
import AccountEditBtn from './index';
import renderer from 'react-test-renderer';


it('should show account dialog', () => {

  const props = {

  };

  const component = <AccountEditBtn {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('should skip account dialog', () => {

  const props = {
    ui: {
      skipAccountDialog: true
    }
  };

  const component = <AccountEditBtn {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});