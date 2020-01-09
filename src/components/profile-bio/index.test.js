import React from 'react';
import ProfileBio from './index';
import renderer from 'react-test-renderer';

it('not in edit mode and bio is empty. should render null', () => {
  const props = {
    toggleUiProp: () => {
    }
  };

  const component = <ProfileBio {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('in edit mode. bio is empty. should show placeholder', () => {
  const props = {
    editMode: true
  };

  const component = <ProfileBio {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('bio is not empty in edit mode. should render bio', () => {
  const props = {
    editMode: true,
    bio: 'Lorem ipsum dolor sit amet'
  };

  const component = <ProfileBio {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('bio is not empty in not edit mode. should render bio (without onclick event)', () => {
  const props = {
    bio: 'Lorem ipsum dolor sit amet'
  };

  const component = <ProfileBio {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
