import React, {Component} from 'react';

import PropTypes from 'prop-types';

import AccountEditBtn from '../elements/account-edit-btn';

import fixClassNames from '../../utils/fix-class-names';

class ProfileDescription extends Component {

  render() {
    const {description, editMode, intl} = this.props;

    if (!editMode && !description) {
      return null;
    }

    if (editMode && !description) {
      return <div className="profile-description edit-mode not-set">
        {intl.formatMessage({id: 'editor.description-placeholder'})}
      </div>
    }

    return <div className={fixClassNames(`profile-description ${editMode ? 'edit-mode' : ''}`)}>
      {description}

      {editMode && <AccountEditBtn {...this.props} />}
    </div>;
  }


}


ProfileDescription.defaultProps = {
  editMode: false,
  description: ''
};

ProfileDescription.propTypes = {
  intl: PropTypes.instanceOf(Object).isRequired,
  editMode: PropTypes.bool,
  description: PropTypes.string
};

export default ProfileDescription;