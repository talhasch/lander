import React, {Component} from 'react';

import {injectIntl} from 'react-intl';


import {bindActionCreators} from "redux";
import {login} from "../../store/user";
import connect from "react-redux/es/connect/connect";

import ProfileImage from '../../components/profile-image';
import ProfileName from '../../components/profile-name';
import ProfileDescription from '../../components/profile-description';


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
    const {user} = this.props;
    if (!user) {
      const {history} = this.props;
      history.push('/');
    }

    /*
    document.addEventListener("visibilitychange", function(a) {
     // console.log(a)
     // console.log( document.visibilityState );
    });
    */
  }

  componentDidUpdate(prevProps, prevState) {

    const {user} = this.props;
    if (!user.loaded) {
      return;
    }

    const {bg} = user.privateData;
    setBg(bg.image, bg.color, bg.blur);
  }

  render() {
    const {user} = this.props;
    if (!(user && user.loaded)) {
      return null;
    }

    const {name, description, image} = user.profile;

    return (
      <div className="main-wrapper">
        <div className="bg"/>
        <div className="profile-box">
          <ProfileImage image={image} {...this.props} />
          <ProfileName name={name} {...this.props}/>
          <ProfileDescription description={description} {...this.props}/>
          <div className="profile-bio">

          </div>


        </div>
      </div>
    )
  }
}


const mapStateToProps = ({user}) => ({
  user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Editor))