import React, {Component} from 'react';

import PropTypes from 'prop-types';

import NavBar from '../../shared/navbar';
import PublishToolbar from './publish-toolbar';
import DesignToolbar from './design-toolbar';

class EditorHeader extends Component {
  render() {
    const {ui} = this.props;

    return (
      <div className="editor-header">
        {!ui.preview &&
        <>
          <NavBar {...this.props} />
          <PublishToolbar {...this.props} />
        </>
        }

        <DesignToolbar {...this.props} />
      </div>
    )
  }
}


EditorHeader.defaultProps = {};

EditorHeader.propTypes = {
  ui: PropTypes.shape({
    preview: PropTypes.bool.isRequired
  })
};

export default EditorHeader;