import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {FormattedMessage} from 'react-intl';

import EditBtn from '../elements/edit-btn';

import fixClassNames from '../../utils/fix-class-names';

class ProfileName extends Component {
  render() {
    const {name, editMode} = this.props;

    if (!editMode && !name) {
      return null;
    }

    if (editMode && !name) {
      return <div className="profile-name edit-mode not-set">
        <FormattedMessage id="editor.name-placeholder"/>
        <EditBtn {...this.props} />
      </div>
    }

    return <div className={fixClassNames(`profile-name ${editMode ? 'edit-mode' : ''}`)}>
      {name}

      {editMode && <EditBtn {...this.props} />}
    </div>;
  }
}


ProfileName.defaultProps = {
  editMode: false,
  name: ''
};

ProfileName.propTypes = {
  editMode: PropTypes.bool,
  name: PropTypes.string
};

export default ProfileName;