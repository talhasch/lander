import React, {Component} from 'react';

import PropTypes from 'prop-types';

import EditBtn from '../elements/edit-btn';

import {accountTypes, accountLink as socialAccountLink} from '../../social';

class SocialAccounts extends Component {

  edit = () => {
    const {toggleUiProp} = this.props;

    if (toggleUiProp) {
      toggleUiProp('accountEdit');
    }
  };

  render() {
    const {accounts, editMode} = this.props;

    const userAccounts = {};
    const userHasAny = !!accountTypes.find(x => accounts[x.id]);

    accountTypes.forEach(x => {
      userAccounts[x.id] = accounts[x.id];
    });

    if (editMode) {

      return <div className="social-accounts edit-mode">
        <EditBtn {...this.props} onClick={this.edit}/>

        {(() => {
          if (userHasAny) {
            return <>
              {accountTypes.map((t) => {
                const ac = userAccounts[t.id];

                if (ac) {
                  return <div key={t.id} className="social-button">{t.icon}</div>;
                }

                return null;
              })}
            </>
          }

          // If user has no social accounts show some icons...
          return <>
            {accountTypes.filter(x => x.defVisible).map(t => {
              return <div key={t.id} className="social-button not-set">{t.icon}</div>
            })}
          </>
        })()}
      </div>;
    }

    const l = accountTypes.map((t) => {
      const ac = userAccounts[t.id];

      if (ac) {
        return <a key={t.id} target="_blank" rel="noopener noreferrer" href={socialAccountLink(t.id, ac)}
                  className="social-button">{t.icon}</a>;
      }
      return null;
    }).filter(x => x !== null);

    if (l.length > 0) {
      return <div className="social-accounts">{l}</div>;
    }

    return null;
  }
}


SocialAccounts.defaultProps = {
  editMode: false,
  accounts: {}
};

SocialAccounts.propTypes = {
  editMode: PropTypes.bool,
  accounts: PropTypes.instanceOf(Object),
};

export default SocialAccounts;
