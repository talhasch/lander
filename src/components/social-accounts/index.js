import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {OverlayTrigger, Tooltip} from 'react-bootstrap';

import {githubSvg, twitterSvg, facebookSvg, instagramSvg, linkedInSvg, hackerNewsSvg} from '../../svg';

const accountTypes = [
  {id: 'github', name: 'Github', 'icon': githubSvg},
  {id: 'twitter', name: 'Twitter', 'icon': twitterSvg},
  {id: 'facebook', name: 'Facebook', 'icon': facebookSvg},
  {id: 'instagram', name: 'Instagram', 'icon': instagramSvg},
  {id: 'linkedIn', name: 'LinkedIn', 'icon': linkedInSvg},
  {id: 'hackerNews', name: 'Hacker News', 'icon': hackerNewsSvg}
];

class SocialAccounts extends Component {

  render() {
    const {accounts, editMode} = this.props;

    const sAccounts = {};

    for (let x = 0; x < accountTypes.length; x++) {
      const i = accountTypes[x];
      sAccounts[i.id] = accounts.find(x => x.service === i.id)
    }

    if (editMode) {
      return <div className="social-accounts edit-mode">

        {accountTypes.map((t) => {
          const ac = sAccounts[t.id];

          let toolTip;
          let btn;

          if (ac) {
            toolTip = <Tooltip>{ac.identifier}</Tooltip>;
            btn = <div key={t.id} className="social-button">{t.icon}</div>;
          } else {
            toolTip = <Tooltip>You haven't set you {t.name} account</Tooltip>;
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
      </div>
    }

    return '';
  }
}


SocialAccounts.defaultProps = {
  editMode: false,
  accounts: []
};

SocialAccounts.propTypes = {
  editMode: PropTypes.bool,
  accounts: PropTypes.arrayOf(PropTypes.shape({
    service: PropTypes.string.isRequired,
    identifier: PropTypes.string.isRequired
  }))
};

export default SocialAccounts;