import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

import {eyeSlashSvg, eyeSvg, magicSvg, shareAltSvg} from '../../../../svg';

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

  toggleShare = () => {
    const {toggleUiProp} = this.props;
    toggleUiProp('share');
    return false;
  };

  render() {
    const {ui} = this.props;

    if (ui.preview) {
      return <div className="design-toolbar in-preview">
        <OverlayTrigger
          placement="right"
          delay={1000}
          overlay={
            <Tooltip>Toggle Preview Mode</Tooltip>
          }>
          <Button className="btn-preview-off" variant="primary"
                  onClick={this.togglePreview}>{eyeSlashSvg}</Button>
        </OverlayTrigger>
      </div>
    }

    return (
      <div className="design-toolbar">
        <div className="left-menu">
          <Button className="btn-style" variant="danger" onClick={this.showStyle}>{magicSvg} Style</Button>
        </div>
        <div className="middle-menu">
          <Button className="btn-preview" variant="primary" onClick={this.togglePreview}>{eyeSvg} Preview</Button>
        </div>
        <div className="right-menu">
          <Button className="btn-preview" variant="light disabled" onClick={this.toggleShare}>{shareAltSvg} Share</Button>
        </div>
      </div>
    )
  }
}

DesignToolbar.defaultProps = {};

DesignToolbar.propTypes = {
  toggleUiProp: PropTypes.func.isRequired,
  ui: PropTypes.shape({
    preview: PropTypes.bool.isRequired
  })
};

export default DesignToolbar;