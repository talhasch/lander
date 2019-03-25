import React from 'react';
import AccountEditBtn from './index';
import renderer from 'react-test-renderer';


it('Render', () => {

  const props = {};

  const component = <AccountEditBtn {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
