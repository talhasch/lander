import React, {Component} from 'react';

import PropTypes from 'prop-types';

import fixClassNames from '../../utils/fix-class-names';

import EditBtn from "../elements/edit-btn";

import bioRenderer from '../../helper/bio-renderer';

import {_t} from '../../i18n';

class ProfileBio extends Component {

  edit = () => {
    const {toggleUiProp} = this.props;

    if (toggleUiProp) {
      toggleUiProp('bioEdit');
    }
  };

  render() {
    const {bio, editMode} = this.props;

    const renderedBio = bioRenderer(bio);

    if (!editMode && !bio) {
      return null;
    }

    if (editMode && !bio) {
      return <div className="profile-bio not-set edit-mode">
        {_t('editor.bio-placeholder')}
        <EditBtn {...this.props} onClick={this.edit}/>
      </div>
    }

    return <div className={fixClassNames(`profile-bio ${editMode ? 'edit-mode' : ''}`)}>
      <div dangerouslySetInnerHTML={{__html: renderedBio}} />
      {editMode && <EditBtn {...this.props} onClick={this.edit}/>}
    </div>;
  }
}


ProfileBio.defaultProps = {
  editMode: false,
  bio: '',
  toggleUiProp: null
};

ProfileBio.propTypes = {
  editMode: PropTypes.bool,
  bio: PropTypes.string,
  toggleUiProp: PropTypes.func
};

export default ProfileBio;
