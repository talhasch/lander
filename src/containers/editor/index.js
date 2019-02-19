import React, {Component} from 'react';

import {injectIntl} from 'react-intl';


import {bindActionCreators} from "redux";
import {updateLocalFile} from "../../store/local-file";
import connect from "react-redux/es/connect/connect";


const setBg = (bgImage, bgColor, blur) => {

  const bgImageUrl = require(`../../data/bg-images/${bgImage}`);

  const el = document.querySelector('.bg');

  el.style.backgroundColor = bgColor;
  el.style.backgroundImage = `url('${bgImageUrl}')`;

  const left = blur * 2;
  const width = left * 2;

  el.style.width = `calc(100% + ${width}px)`;
  el.style.height = `calc(100% + ${width}px)`;

  el.style.left = `-${left}px`;
  el.style.top = `-${left}px`;

  el.style.filter = `blur(${blur}px)`;

};


class Editor extends Component {

  componentDidMount() {
    const {localFile} = this.props;
    if (!localFile) {
      const {history} = this.props;
      history.push('/app/welcome');
      return;
    }

    const {bg} = localFile;
    setBg(bg.image, bg.color, bg.blur);
  }

  componentDidUpdate(prevProps, prevState) {

  }

  render() {
    const {localFile} = this.props;
    if (!localFile) {
      return null;
    }

    const {name, description} = localFile;
    return (
      <div className="main-wrapper">
        <div className="bg"/>
        <div className="profile-box">
          <div className="profile-image"/>
          <div className="profile-name">{name}</div>
          <div className="profile-title">{description}</div>
          <div className="profile-description">

          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({localFile}) => ({
  localFile
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateLocalFile
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Editor))