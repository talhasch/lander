import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

import {eyeSlashSvg, eyeSvg, magicSvg} from '../../../../svg';

class DesignToolbar extends Component {


  showStyle = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('style');
    return false;
  };

  togglePreview = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('preview');
    return false;
  };


  render() {
    const {ui} = this.props;

    if (ui.preview) {
      return <div className="design-toolbar">
        <OverlayTrigger
          placement="right"
          delay={1000}
          overlay={
            <Tooltip>Toggle Preview Mode</Tooltip>
          }>
          <Button className="btn-preview-off" variant="light disabled"
                  onClick={this.togglePreview}>{eyeSlashSvg}</Button>
        </OverlayTrigger>
      </div>
    }

    return (
      <div className="design-toolbar">
        <div className="left-menu">
          <Button className="btn-preview" variant="light disabled"
                  onClick={this.togglePreview}>{eyeSvg} Preview</Button>
        </div>
        <div className="right-menu">
          <Button className="btn-style" variant="danger" onClick={this.showStyle}>{magicSvg} Style</Button>
        </div>
      </div>
    )
  }
}

DesignToolbar.defaultProps = {};

DesignToolbar.propTypes = {
  toggleUiProp: () => {
  },
  ui: PropTypes.shape({
    preview: PropTypes.bool.isRequired
  })
};

export default DesignToolbar;