import React, {Component} from 'react';

import ProfilePhoto from '../../profile-photo';
import ProfileName from '../../profile-name';
import ProfileDescription from '../../profile-description';
import ProfileBg from '../../profile-bg';
import SocialAccounts from '../../social-accounts';
import WalletAccounts from '../../wallet-accounts';
import ProfileBio from '../../profile-bio';

import SettingsDialog from '../../dialogs/settings';
import StyleDialog from '../../dialogs/style';
import PhotoUploadDialog from '../../dialogs/photo-upload';
import NameEditDialog from '../../dialogs/name-edit';
import DescriptionEditDialog from '../../dialogs/description-edit';
import AccountEditDialog from '../../dialogs/account-edit';

import BioEditDialog from '../../dialogs/bio-edit';
import Spinner from '../../elements/spinner';

import fixClassNames from '../../../utils/fix-class-names';

import EditorNavBar from './header';

import {getFlagLocal} from '../../../dbl';

class EditorPage extends Component {

  componentDidMount() {
    const {user} = this.props;
    const {history} = this.props;

    if (!user) {
      history.push('/');
      return;
    }

    if (getFlagLocal(user.username) !== 'ok') {
      history.push('/app/welcome');
    }
  }

  render() {
    const {user, ui} = this.props;
    if (!(user && user.loaded)) {
      return <Spinner/>;
    }

    const {account} = user.profile;

    return (
      <>

        {ui.photoUpload && <PhotoUploadDialog  {...this.props}  />}
        {ui.nameEdit && <NameEditDialog  {...this.props}  />}
        {ui.descriptionEdit && <DescriptionEditDialog  {...this.props}  />}
        {ui.bioEdit && <BioEditDialog {...this.props} />}
        {ui.accountEdit && <AccountEditDialog {...this.props} />}
        {ui.style && <StyleDialog {...this.props} />}
        {ui.settings && <SettingsDialog {...this.props} />}
        <div className={ui.preview ? 'main-wrapper-profile' : 'main-wrapper'}>
          <ProfileBg bg={user.draft.bg}/>
          <div className="inner-wrapper">
            <EditorNavBar {...this.props} />
            <div className={fixClassNames(`profile-box ${!ui.preview ? 'edit-mode' : ''}`)}>
              <ProfilePhoto imageUrl={user.draft.photo} editMode={!ui.preview} {...this.props}/>
              <ProfileName name={user.draft.name} editMode={!ui.preview} {...this.props}/>
              <ProfileDescription description={user.draft.description} editMode={!ui.preview} {...this.props}/>
              <ProfileBio bio={user.draft.bio} editMode={!ui.preview} {...this.props}/>
              <SocialAccounts accounts={user.draft.accounts} editMode={!ui.preview} {...this.props}/>
              <WalletAccounts accounts={account} editMode={!ui.preview} {...this.props}/>
            </div>
          </div>
        </div>
      </>
    )
  }
}


export default EditorPage;