import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Dropdown} from 'react-bootstrap';

import {ellipsisSvg} from '../../../../svg';

class ExtraMenu extends Component {
  crypto = (e) => {
    e.preventDefault();

    const {toggleUiProp} = this.props;
    toggleUiProp('walletEdit');
  };

  contact = (e) => {
    e.preventDefault();

    const {toggleUiProp} = this.props;
    toggleUiProp('contact');
  };

  render() {

    return (
      <div className="extra-menu">
        <Dropdown>
          <Dropdown.Toggle size="sm" variant="link" id="dropdown-basic">
            {ellipsisSvg}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={this.crypto}>Wallet Addresses</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}


ExtraMenu.defaultProps = {};

ExtraMenu.propTypes = {
  toggleUiProp: PropTypes.func.isRequired
};

export default ExtraMenu;
