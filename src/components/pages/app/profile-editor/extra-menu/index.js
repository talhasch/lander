import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Dropdown} from 'react-bootstrap';

import {ellipsisSvg} from '../../../../../svg';

class ExtraMenu extends Component {
  crypto = (e) => {
    e.preventDefault();

    const {toggleUiProp} = this.props;
    toggleUiProp('walletEdit');
  };

  contact = (e) => {
    e.preventDefault();

    const {toggleUiProp} = this.props;
    toggleUiProp('contactEdit');
  };

  render() {
    const {draft} = this.props;
    const {wallets, contact} = draft;

    const menuItems = [];

    if (!wallets || !Object.values(wallets).find(x => x)) {
      menuItems.push(<Dropdown.Item key="wallets" href="#" onClick={this.crypto}>Wallet Addresses</Dropdown.Item>);
    }

    if (!contact || !Object.values(contact).find(x => x)) {
      menuItems.push(<Dropdown.Item key="contact" href="#" onClick={this.contact}>Contact Information</Dropdown.Item>);
    }

    if (menuItems.length === 0) {
      return null;
    }

    return (
      <div className={`extra-menu with-${menuItems.length}-items`}>
        <Dropdown>
          <Dropdown.Toggle size="sm" variant="link" id="dropdown-basic">
            {ellipsisSvg}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {menuItems}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}


ExtraMenu.defaultProps = {
  draft: {
    wallets: {},
    contact: {}
  }
};

ExtraMenu.propTypes = {
  draft: PropTypes.shape({
    wallets: PropTypes.shape({}),
    contact: PropTypes.shape({}),
  }),
  toggleUiProp: PropTypes.func.isRequired
};

export default ExtraMenu;
