import React from 'react';
import Contact, {ContactDialogContent} from './index';
import renderer from 'react-test-renderer';


it('1- ContactDialogContent - render', () => {
  const props = {
    contact: {
      email: 'foo@bar.com',
      phone: '+90 501 223 34 43',
      website: 'http://www.zoogle.com',
      address: 'foo bar baz street 12 NY'
    }
  };

  const component = <ContactDialogContent {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('2- Contact - no contact data. should render null. (should run without contact data)', () => {
  const props = {

  };

  const component = <Contact {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('3- Contact - in edit mode. some data passed', () => {
  const props = {
    editMode: true,
    contact: {
      email: 'foo@bar.com'
    }
  };

  const component = <Contact {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('4- Contact - not in edit mode. some data passed', () => {
  const props = {
    editMode: false,
    contact: {
      email: 'foo@bar.com'
    }
  };

  const component = <Contact {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

