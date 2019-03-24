import React, {Component} from 'react';

import ProfileImage from '../../profile-image';
import ProfileName from '../../profile-name';
import ProfileDescription from '../../profile-description';
import ProfileBg from '../../profile-bg';
import SocialAccounts from '../../social-accounts';
import WalletAccounts from '../../wallet-accounts';
import ProfileBio from '../../profile-bio';

import SettingsDialog from '../../dialogs/settings';
import StyleDialog from '../../dialogs/style';

import AccountEditDialog from '../../dialogs/account-edit';
import BioEditDialog from '../../dialogs/bio-edit';
import Spinner from '../../elements/spinner';

import fixClassNames from '../../../utils/fix-class-names';

import EditorNavBar from './header'

class EditorPage extends Component {

  componentDidMount() {
    const {user} = this.props;
    const {history} = this.props;

    if (!user) {
      history.push('/');
      return;
    }

    if (!localStorage.getItem('flag1')) {
      history.push('/app/welcome');
      return;
    }

    document.addEventListener('visibilitychange', this.visibilityChanged);
  }

  componentWillUnmount() {
    document.removeEventListener('visibilitychange', this.visibilityChanged);
  }

  visibilityChanged = () => {
    if (document.visibilityState === 'visible') {
      const {loadProfile} = this.props;
      loadProfile();
    }
  };

  render() {

    const {user, ui} = this.props;
    if (!(user && user.loaded)) {
      return <Spinner/>;
    }

    const {name, description, image, account} = user.profile;

    return (
      <>
        {ui.accountEdit && <AccountEditDialog {...this.props} />}
        {ui.bioEdit && <BioEditDialog {...this.props} />}
        {ui.style && <StyleDialog {...this.props} />}
        {ui.settings && <SettingsDialog {...this.props} />}
        <div className={ui.preview ? 'main-wrapper-profile' : 'main-wrapper'}>
          <ProfileBg bg={user.draft.bg}/>
          <div className="inner-wrapper">
            <EditorNavBar {...this.props} />
            <div className={fixClassNames(`profile-box ${!ui.preview ? 'edit-mode' : ''}`)}>
              <ProfileImage image={image} editMode={!ui.preview} {...this.props}/>
              <ProfileName name={name} editMode={!ui.preview} {...this.props}/>
              <ProfileDescription description={description} editMode={!ui.preview} {...this.props}/>
              <ProfileBio bio={user.draft.bio} editMode={!ui.preview} {...this.props}/>
              <SocialAccounts accounts={account} editMode={!ui.preview} {...this.props}/>
              <WalletAccounts accounts={account} editMode={!ui.preview} {...this.props}/>
            </div>
          </div>
        </div>
      </>
    )
  }
}


export default EditorPage;