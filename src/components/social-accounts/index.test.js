import React from 'react';
import SocialAccounts from './index';
import renderer from 'react-test-renderer';

import wrapWithIntl from '../../utils/test-helper';

// to fix [Invariant Violation: Unable to find node on an unmounted component.] error
jest.mock('react-dom', () => ({
  findDOMNode: () => ({}),
}));


it('in edit mode. no accounts provided. should show all buttons not set.', () => {
  const props = {
    editMode: true
  };

  const component = wrapWithIntl(<SocialAccounts {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('in edit mode. twitter provided. should show twitter button set all other buttons not set.', () => {
  const props = {
    editMode: true,
    accounts: [{
      service: 'twitter',
      identifier: 'talhasch'
    }]
  };

  const component = wrapWithIntl(<SocialAccounts {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('not in edit mode. no accounts provided. should render null', () => {
  const props = {};

  const component = wrapWithIntl(<SocialAccounts {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('not in edit mode. twitter and github provided', () => {
  const props = {
    accounts: [{
      service: 'twitter',
      identifier: 'talhasch'
    }, {
      service: 'github',
      identifier: 'talhasch'
    }]
  };

  const component = wrapWithIntl(<SocialAccounts {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
