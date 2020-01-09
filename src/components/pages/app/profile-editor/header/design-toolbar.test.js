import React from 'react';
import renderer from 'react-test-renderer';

import DesignToolbar from './design-toolbar';

// to fix [Invariant Violation: Unable to find node on an unmounted component.] error
jest.mock('react-dom', () => ({
  findDOMNode: () => ({}),
}));

it('default', () => {
  const props = {
    toggleUiProp: () => {

    },
    ui: {
      preview: false
    }
  };

  const component = <DesignToolbar {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('in preview', () => {
  const props = {
    toggleUiProp: () => {

    },
    ui: {
      preview: true
    }
  };

  const component = <DesignToolbar {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
