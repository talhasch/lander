import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {FormattedMessage} from 'react-intl';

import AccountEditBtn from '../elements/account-edit-btn';

import {walletAccountTypes as accountTypes} from '../../constants';

class WalletAccounts extends Component {
  render() {

    const {accounts, editMode} = this.props;
    const wAccounts = {};

    for (let x = 0; x < accountTypes.length; x++) {
      const i = accountTypes[x];
      wAccounts[i.id] = accounts.find(x => x.service === i.id)
    }

    if (editMode) {
      return <div className="wallet-accounts edit-mode">
        <AccountEditBtn {...this.props} />
        {accountTypes.map((t) => {
          const ac = wAccounts[t.id];
          return <div key={t.id} className="wallet-account">
            <div className="icon">{t.icon}</div>
            <div className="address">
              {ac ? ac.identifier : <FormattedMessage id="wallet-accounts.not-set" values={{n: t.name}}/>}
            </div>
          </div>
        })}
      </div>;
    }

    const l = accountTypes.map((t) => {
      const ac = wAccounts[t.id];
      if (ac) {
        return <div key={t.id} className="wallet-account">
          <div className="icon">{t.icon}</div>
          <div className="address">{ac.identifier}</div>
        </div>;
      }
      return null;
    }).filter(x => x !== null);

    if (l.length > 0) {
      return <div className="wallet-accounts">{l}</div>;
    }

    return null;
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