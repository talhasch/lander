import React, {Component} from 'react';

import PropTypes from 'prop-types';

import EditBtn from '../elements/edit-btn';

import fixClassNames from '../../utils/fix-class-names';

import {_t} from '../../i18n';

class ProfileDescription extends Component {

  edit = () => {
    const {toggleUiProp} = this.props;

    if (toggleUiProp) {
      toggleUiProp('descriptionEdit');
    }
  };

  render() {
    const {description, editMode} = this.props;

    if (!editMode && !description) {
      return null;
    }

    if (editMode && !description) {
      return <div className="profile-description edit-mode not-set">
        {_t('editor.description-placeholder')}
        <EditBtn {...this.props} onClick={this.edit}/>
      </div>
    }

    return <div className={fixClassNames(`profile-description ${editMode ? 'edit-mode' : ''}`)}>
      {description}
      {editMode && <EditBtn {...this.props} onClick={this.edit}/>}
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
