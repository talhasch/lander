import React, {Component} from 'react';

import PropTypes from 'prop-types';

import AccountEditBtn from '../elements/account-edit-btn';

import fixClassNames from '../../utils/fix-class-names';
import {FormattedMessage} from "react-intl";

class ProfileDescription extends Component {

  render() {
    const {description, editMode} = this.props;

    if (!editMode && !description) {
      return null;
    }

    if (editMode && !description) {
      return <div className="profile-description edit-mode not-set">
        <FormattedMessage id="editor.description-placeholder"/>
        <AccountEditBtn {...this.props} />
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
  editMode: PropTypes.bool,
  description: PropTypes.string
};

export default ProfileDescription;