import React from 'react';
import ProfileName from './index';
import renderer from 'react-test-renderer';

import wrapWithIntl from '../../utils/test-helper';

it('not in edit mode and name is empty. should render null', () => {
  const props = {};

  const component = wrapWithIntl(<ProfileName {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('in edit mode. name is empty. should show placeholder and show edit btn', () => {
  const props = {
    editMode: true
  };

  const component = wrapWithIntl(<ProfileName {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('name is not empty in edit mode. should render name and show edit btn', () => {
  const props = {
    editMode: true,
    name: 'Lorem ipsum dolor sit amet'
  };

  const component = wrapWithIntl(<ProfileName {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('name is not empty in not edit mode. should render name.', () => {
  const props = {
    name: 'Lorem ipsum dolor sit amet'
  };

  const component = wrapWithIntl(<ProfileName {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});