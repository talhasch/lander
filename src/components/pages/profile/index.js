import React, {Component} from 'react';

import * as axios from 'axios';
import * as blockStack from 'blockstack';

import {publishedFile} from '../../../constants';

import getBaseUrl from '../../../utils/get-base-url';

import ProfileBg from '../../profile-bg';
import ProfilePhoto from '../../profile-photo';
import ProfileName from '../../profile-name';
import ProfileDescription from '../../profile-description';
import ProfileBio from '../../profile-bio';
import SocialAccounts from '../../social-accounts';
import WalletAccounts from '../../wallet-accounts';
import Spinner from '../../elements/spinner';


class ProfilePage extends Component {

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
    }).then(() => {
      this.setState({loading: false});
    })
  }

  fetch = async () => {
    const {match} = this.props;
    const {username} = match.params;

    let profile;
    let published;

    try {
      profile = await blockStack.lookupProfile(username);
      const fileUrl = await blockStack.getUserAppFileUrl(publishedFile, username, getBaseUrl());
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
    const {location} = this.props;

    if (loading) {
      return <Spinner/>;
    }

    if (notFound) {
      return <div className="not-found-error">
        <h1>404</h1>
        <strong>{location.pathname} not found</strong>
      </div>;
    }

    const {user} = this.state;

    const {name, description, image, account} = user.profile;

    return <div className="main-wrapper-profile">
      <ProfileBg bg={user.published.bg}/>
      <div className="inner-wrapper">
        <div className="profile-box">
          <ProfilePhoto image={image} {...this.props}/>
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


export default ProfilePage;