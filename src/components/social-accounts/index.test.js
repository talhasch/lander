import React from 'react';
import SocialAccounts from './index';
import renderer from 'react-test-renderer';

// to fix [Invariant Violation: Unable to find node on an unmounted component.] error
jest.mock('react-dom', () => ({
  findDOMNode: () => ({}),
}));


it('1- in edit mode. no accounts provided. should show some buttons with icons', () => {
  const props = {
    editMode: true
  };

  const component = <SocialAccounts {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('2- in edit mode. twitter provided. should show only twitter button.', () => {
  const props = {
    editMode: true,
    accounts: {
      twitter: 'talhasch'
    }
  };

  const component = <SocialAccounts {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('3- not in edit mode. no accounts provided. should render null', () => {
  const props = {};

  const component = <SocialAccounts {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('4- not in edit mode. twitter and github provided', () => {
  const props = {
    accounts: {twitter: 'talhasch', 'github': 'talhasch'}
  }

  const component = <SocialAccounts {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

