import React from 'react';
import ProfileDescription from './index';
import renderer from 'react-test-renderer';

it('not in edit mode and description is empty. should render null', () => {
  const props = {};

  const component = <ProfileDescription {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('in edit mode. description is empty. should show placeholder and show edit btn', () => {
  const props = {
    editMode: true
  };

  const component = <ProfileDescription {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('description is not empty in edit mode. should render description and show edit btn', () => {
  const props = {
    editMode: true,
    description: 'Lorem ipsum dolor sit amet'
  };

  const component = <ProfileDescription {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('description is not empty in not edit mode. should render description.', () => {
  const props = {
    description: 'Lorem ipsum dolor sit amet'
  };

  const component = <ProfileDescription {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
