import React from 'react';
import ExtraMenu from './index';
import renderer from 'react-test-renderer';


it('1- No data provided. should shown', () => {
  const props = {
    toggleUiProp: () => {
    },
    draft: {
      wallets: {
        bitcoin: '',
        ethereum: ''
      },
      contact: {
        email: ''
      }
    }
  };

  const component = <ExtraMenu {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('2- Wallet data and contact data provided. should render null ', () => {
  const props = {
    toggleUiProp: () => {
    },
    draft: {
      wallets: {
        bitcoin: '21123213',
        ethereum: 'x01312321'
      },
      contact: {
        email: 'foo@bar'
      }
    }
  };

  const component = <ExtraMenu {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('3- Contact provided but wallets. should shown', () => {
  const props = {
    toggleUiProp: () => {
    },
    draft: {
      wallets: {
        bitcoin: '',
        ethereum: ''
      },
      contact: {
        email: 'foo@bar.com'
      }
    }
  };

  const component = <ExtraMenu {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it('4- undefined contact data. for backward compability. should shown', () => {
  const props = {
    toggleUiProp: () => {
    },
    draft: {
      wallets: {
        bitcoin: 'x1x1',
        ethereum: ''
      }
    }
  };

  const component = <ExtraMenu {...props} />;

  const tree = renderer
    .create(component)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
