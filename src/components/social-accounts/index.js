import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {githubSvg, twitterSvg, facebookSvg, instagramSvg, linkedInSvg, hackerNewsSvg} from '../../svg';


class SocialAccounts extends Component {


  render() {

    const {accounts, editMode} = this.props;


    const sAccounts = {
      github: accounts.find(x => x.service === 'github'),
      twitter: accounts.find(x => x.service === 'twitter'),
      facebook: accounts.find(x => x.service === 'facebook'),
      instagram: accounts.find(x => x.service === 'instagram'),
      linkedIn: accounts.find(x => x.service === 'linkedIn'),
      hackerNews: accounts.find(x => x.service === 'hackerNews')
    };

    if (editMode) {
      return <div className="social-accounts">
        <div className="social-button">{githubSvg}</div>
        <div className="social-button">{twitterSvg}</div>
        <div className="social-button">{facebookSvg}</div>
        <div className="social-button">{instagramSvg}</div>
        <div className="social-button">{linkedInSvg}</div>
        <div className="social-button">{hackerNewsSvg}</div>
      </div>;
    }

    if (!accounts) {
      return '';
    }
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