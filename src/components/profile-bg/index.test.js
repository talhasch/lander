import React from 'react';
import ProfileBg from './index';
import renderer from 'react-test-renderer';

it('render component', () => {

  const props = {
    bg: {
      image: 'wave.jpg',
      color: '#cccccc',
      blur: 3
    }
  };

  const component = <ProfileBg {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});