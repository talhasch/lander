import React from 'react';
import Spinner from './index';
import renderer from 'react-test-renderer';


it('render component', () => {
  const component = <Spinner/>;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});