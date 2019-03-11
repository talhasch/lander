import React from 'react';
import renderer from 'react-test-renderer';

import wrapWithIntl from '../../../../utils/test-helper';

import PublishToolbar from './publish-toolbar';

it('not published', () => {
  const props = {
    user: {
      username: 'lorem',
      draft: {
        updated: '1011'
      },
      published: null
    }
  };

  const component = wrapWithIntl(<PublishToolbar {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('changed and not published', () => {
  const props = {
    user: {
      username: 'lorem',
      draft: {
        updated: '1011'
      },
      published: {
        updated: '10121'
      }
    }
  };

  const component = wrapWithIntl(<PublishToolbar {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('up to date', () => {
  const props = {
    user: {
      username: 'lorem',
      draft: {
        updated: '22222'
      },
      published: {
        updated: '22222'
      }
    }
  };

  const component = wrapWithIntl(<PublishToolbar {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});