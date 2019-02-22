import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {bitcoinSvg, ethereumSvg} from '../../svg';


class WalletAccounts extends Component {


  render() {

    const {accounts, editMode} = this.props;

    const wAccounts = {
      bitcoin: accounts.find(x => x.service === 'bitcoin'),
      ethereum: accounts.find(x => x.service === 'ethereum')
    };

    if (editMode) {
      return <div className="wallet-accounts">
        <div className="wallet-account">
          <div className="icon">{bitcoinSvg}</div>
          <div className="address">{wAccounts.bitcoin ? wAccounts.bitcoin.identifier : 'sss'}</div>
        </div>

        <div className="wallet-account">
          <div className="icon">{ethereumSvg}</div>
          <div className="address">{wAccounts.ethereum ? wAccounts.ethereum.identifier : 'sss'}</div>
        </div>
      </div>;
    }

    if (!accounts) {
      return '';
    }


    return null
  }
}


WalletAccounts.defaultProps = {
  editMode: false,
  accounts: []
};

WalletAccounts.propTypes = {
  editMode: PropTypes.bool,
  accounts: PropTypes.arrayOf(PropTypes.shape({
    service: PropTypes.string.isRequired,
    identifier: PropTypes.string.isRequired
  }))
};

export default WalletAccounts;