import React from 'react';
import ProfileBg from './index';
import renderer from 'react-test-renderer';

import wrapWithIntl from '../../utils/test-helper';

it('render component', () => {

  const props = {
    bg: {
      image: 'wave.jpg',
      color: '#cccccc',
      blur: 3
    }
  };

  const component = wrapWithIntl(<ProfileBg {...props} />);

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});