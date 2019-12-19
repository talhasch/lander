import React, {Component} from 'react';

import PropTypes from 'prop-types';

import * as axios from 'axios';
import * as blockStack from 'blockstack';

import {publishedFile} from '../../../constants';

import getBaseUrl from '../../../utils/get-base-url';

import isRealUsername from '../../../helper/is-real-username';
import {UserBucketUrl} from '../../../model';

import ProfileBg from '../../profile-bg';
import ProfilePhoto from '../../profile-photo';
import ProfileName from '../../profile-name';
import ProfileDescription from '../../profile-description';
import ProfileBio from '../../profile-bio';
import SocialAccounts from '../../social-accounts';
import WalletAccounts from '../../wallet-accounts';
import Spinner from '../../elements/spinner';
import ProfileC2a from '../../elements/profile-c2a';

import {aliasRe} from '../../../constants';
import {Alias} from '../../../model';

class ProfilePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      notFound: false,
      data: null
    }
  }

  async componentDidMount() {

    if (window.__p) {
      this.setState({data: window.__p, loading: false});
      return;
    }

    const {match} = this.props;
    const {username} = match.params;

    if (aliasRe.test(username)) {
      const aliases = await Alias.fetchList({alias: username});

      if (aliases.length > 0) {
        const [al,] = aliases;
        const {attrs} = al;

        window.location.href = `/${attrs.username}`;
        return;
      }
    }

    this.fetch().then(data => {
      if (!data) {
        this.setState({notFound: true});
        return;
      }

      this.setState({data});
    }).then(() => {
      this.setState({loading: false});
    })
  }

  fetch = async () => {
    const {match} = this.props;
    const {username} = match.params;

    let data;
    let fileUrl;

    if (isRealUsername(username)) {
      fileUrl = await blockStack.getUserAppFileUrl(publishedFile, username, getBaseUrl());
    } else {
      const docs = await UserBucketUrl.fetchList({username});
      if (docs.length > 0) {
        const [doc,] = docs;
        const bucketUrl = doc.attrs.url;
        fileUrl = `${bucketUrl}${publishedFile}`;
      }
    }

    if (!fileUrl) {
      return;
    }

    try {
      data = await axios.get(fileUrl).then(x => x.data);
    } catch (e) {
      return false;
    }

    return data;
  };

  render() {
    const {loading, notFound} = this.state;
    const {location, user} = this.props;

    if (loading) {
      return <Spinner/>;
    }

    if (notFound) {
      return <div className="not-found-error">
        <h1>404</h1>
        <strong>{location.pathname} not found</strong>
      </div>;
    }

    const {data} = this.state;

    return <div className="main-wrapper-profile">
      <ProfileBg bg={data.bg}/>
      <div className="profile-header">
        {!user && <ProfileC2a  {...this.props} />}
      </div>
      <div className="inner-wrapper">
        <div className="profile-box">
          <ProfilePhoto imageUrl={data.photo} {...this.props}/>
          <ProfileName name={data.name} {...this.props}/>
          <ProfileDescription description={data.description} {...this.props}/>
          <ProfileBio bio={data.bio} {...this.props}/>
          <SocialAccounts accounts={data.accounts} {...this.props}/>
          <WalletAccounts accounts={data.wallets} {...this.props}/>
        </div>
      </div>
    </div>
  }
}

ProfilePage.defaultProps = {};

ProfilePage.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  })
};

export default ProfilePage;
