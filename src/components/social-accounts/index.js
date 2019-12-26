import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {OverlayTrigger, Tooltip} from 'react-bootstrap';

import {FormattedHTMLMessage} from 'react-intl';

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

    const sAccounts = {};

    for (let x = 0; x < accountTypes.length; x++) {
      const i = accountTypes[x];
      sAccounts[i.id] = accounts[i.id];
    }

    if (editMode) {
      return <div className="social-accounts edit-mode">
        {accountTypes.map((t) => {
          const ac = sAccounts[t.id];

          let toolTip;
          let btn;


          if (ac) {
            toolTip = <Tooltip>{socialAccountLink(t.id, ac)}</Tooltip>;
            btn = <div key={t.id} className="social-button">{t.icon}</div>;
          } else {
            toolTip = <Tooltip><FormattedHTMLMessage id="social-accounts.not-set" values={{n: t.name}}/></Tooltip>;
            btn = <div key={t.id} className="social-button not-set">{t.icon}</div>;
          }

          return <OverlayTrigger
            key={t.id}
            placement="bottom"
            delay={1000}
            overlay={
              toolTip
            }>
            {btn}
          </OverlayTrigger>
        })}

        <EditBtn {...this.props} onClick={this.edit}/>
      </div>
    }

    const l = accountTypes.map((t) => {
      const ac = sAccounts[t.id];

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
