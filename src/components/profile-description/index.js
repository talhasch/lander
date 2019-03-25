import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {FormattedMessage} from "react-intl";

import EditBtn from '../elements/edit-btn';

import fixClassNames from '../../utils/fix-class-names';

class ProfileDescription extends Component {

  render() {
    const {description, editMode} = this.props;

    if (!editMode && !description) {
      return null;
    }

    if (editMode && !description) {
      return <div className="profile-description edit-mode not-set">
        <FormattedMessage id="editor.description-placeholder"/>
        <EditBtn {...this.props} />
      </div>
    }

    return <div className={fixClassNames(`profile-description ${editMode ? 'edit-mode' : ''}`)}>
      {description}
      {editMode && <EditBtn {...this.props} />}
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