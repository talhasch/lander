import React from 'react';
import ProfileDescription from './index';
import renderer from 'react-test-renderer';

import wrapWithIntl from '../../utils/test-helper';

it('not in edit mode and description is empty. should render null', () => {
  const props = {};

  const component = wrapWithIntl(<ProfileDescription {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('in edit mode. description is empty. should show placeholder and show edit btn', () => {
  const props = {
    editMode: true,
    ui: {
      skipAccountDialog: false
    }
  };

  const component = wrapWithIntl(<ProfileDescription {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('description is not empty in edit mode. should render description and show edit btn', () => {
  const props = {
    editMode: true,
    description: 'Lorem ipsum dolor sit amet',
    ui: {
      skipAccountDialog: false
    }
  };

  const component = wrapWithIntl(<ProfileDescription {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('description is not empty in not edit mode. should render description.', () => {
  const props = {
    description: 'Lorem ipsum dolor sit amet'
  };

  const component = wrapWithIntl(<ProfileDescription {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});