import {Component} from 'react';

import {injectIntl} from 'react-intl';

import {publishedFile} from '../../constants';

import getBaseUrl from '../../utils/get-base-url';
import React from 'react';
import ProfileBg from '../../components/profile-bg';
import ProfileImage from '../../components/profile-image';
import ProfileName from '../../components/profile-name';
import ProfileDescription from '../../components/profile-description';
import ProfileBio from '../../components/profile-bio';
import SocialAccounts from '../../components/social-accounts';
import WalletAccounts from '../../components/wallet-accounts';

const axios = require('axios');
const blockstack = require('blockstack');

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      notFound: false,
      user: null
    }
  }

  componentDidMount() {
    this.fetch().then(resp => {
      if (resp === false) {
        this.setState({notFound: true});
        return;
      }

      this.setState({user: resp});

      // TODO: Find better approach
      document.title = `${resp.profile.name} - ${document.title}`;
    }).finally(() => {
      this.setState({loading: false});
    })
  }

  fetch = async () => {
    const {match} = this.props;
    const {username} = match.params;

    let profile;
    let published;

    try {
      profile = await blockstack.lookupProfile(username);
      const fileUrl = await blockstack.getUserAppFileUrl(publishedFile, username, getBaseUrl());
      published = await axios.get(fileUrl).then(x => x.data);
    } catch (e) {
      return false;
    }

    if (published === '') {
      return false;
    }

    return {profile, published};
  };

  render() {
    const {loading, notFound} = this.state;

    if (loading) {
      return '...';
    }

    if (notFound) {
      return '404';
    }

    const {user} = this.state;

    const {name, description, image, account} = user.profile;

    return <div className="main-wrapper-profile">
      <ProfileBg bg={user.published.bg}/>
      <div className="inner-wrapper">
        <div className="profile-box">
          <ProfileImage image={image} {...this.props}/>
          <ProfileName name={name} {...this.props}/>
          <ProfileDescription description={description} {...this.props}/>
          <ProfileBio bio={user.published.bio} {...this.props}/>
          <SocialAccounts accounts={account} {...this.props}/>
          <WalletAccounts accounts={account} {...this.props}/>
        </div>
      </div>
    </div>
  }
}


export default injectIntl(Profile)