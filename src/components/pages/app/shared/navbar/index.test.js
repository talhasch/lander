import React from 'react';
import renderer from 'react-test-renderer';

import wrapWithIntl from '../../../../../utils/test-helper';

import NavBar from '../../shared/navbar';

// to fix [Invariant Violation: Unable to find node on an unmounted component.] error
jest.mock('react-dom', () => ({
  findDOMNode: () => ({}),
}));

it('default render', () => {
  const props = {
    history: () => {

    },
    toggleUiProp: () => {

    },
    logout: () => {

    },
    user: {
      username: 'lorem'
    }
  };

  const component = wrapWithIntl(<NavBar {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
