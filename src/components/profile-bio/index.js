import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {FormattedMessage} from 'react-intl';

import fixClassNames from '../../utils/fix-class-names';

class ProfileBio extends Component {

  edit = () => {
    const {toggleUiProp} = this.props;

    if (toggleUiProp) {
      toggleUiProp('bioEdit');
    }
  };

  render() {
    const {bio, editMode} = this.props;

    const renderBio = bio.split("\n").filter(x => x.trim()).map((x, a) => <p key={`p-${a}`}>{x}</p>);

    if (!editMode && !bio) {
      return null;
    }

    if (editMode && !bio) {
      return <div className="profile-bio not-set edit-mode" onClick={this.edit}>
        <FormattedMessage id="editor.bio-placeholder"/>
      </div>
    }

    const eProps = {
      className: fixClassNames(`profile-bio ${editMode ? 'edit-mode' : ''}`)
    };

    if (editMode) {
      eProps.onClick = this.edit;
    }

    return <div {...eProps}>{renderBio}</div>;
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
