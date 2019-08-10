import React from 'react';
import ProfileC2a from './index';
import renderer from 'react-test-renderer';


it('Render', () => {

  const props = {};

  const component = <ProfileC2a {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
