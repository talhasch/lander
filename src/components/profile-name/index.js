import React, {Component} from 'react';

import PropTypes from 'prop-types';

import AccountEditBtn from '../elements/account-edit-btn';

import fixClassNames from '../../utils/fix-class-names';

class ProfileName extends Component {
  render() {
    const {name, editMode, intl} = this.props;

    if (!editMode && !name) {
      return null;
    }

    if (editMode && !name) {
      return <div className="profile-name edit-mode not-set">
        {intl.formatMessage({id: 'editor.name-placeholder'})}
      </div>
    }

    return <div className={fixClassNames(`profile-name ${editMode ? 'edit-mode' : ''}`)}>
      {name}

      {editMode && <AccountEditBtn {...this.props} />}
    </div>;
  }
}


ProfileName.defaultProps = {
  editMode: false,
  name: ''
};

ProfileName.propTypes = {
  intl: PropTypes.instanceOf(Object).isRequired,
  editMode: PropTypes.bool,
  name: PropTypes.string
};

export default ProfileName;