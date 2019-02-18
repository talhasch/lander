import React, {Component} from 'react';

import {injectIntl} from 'react-intl';

import bgImage from '../../data/bg-images/wave.jpg';

const bgColor = 'red';
const blur = 2;

const setBg = () => {
  const el = document.querySelector('.bg');

  const left = blur * 2;
  const width = left * 2;

  el.style.width = `calc(100% + ${width}px)`;
  el.style.height = `calc(100% + ${width}px)`;

  el.style.left = `-${left}px`;
  el.style.top = `-${left}px`;

  el.style.filter = `blur(${blur}px)`;

};

/*
  width: calc(100% + 8px);
  height: calc(100% + 8px);
  left: -4px;
  top: -4px;
  z-index: 1;
  filter: blur(2px);
  background: aquamarine;
 */

class Editor extends Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    setBg();

    // File check
    const a = window.blockstack.getFile('aaa');
    if (a === null) {
      // redirect here
    }

    // Local content check
    //  If not exists copy from remote file

    // persist local
    // if not exists local
    // check remote file
    // if remote file not exists
    // == means first time


    const user = window.blockstack.loadUserData();

    console.log(user)
    /*
    window.blockstack.getFile('a.txt').then(resp => {

    });
    */


  }

  render() {
    return (
      <div className="main-wrapper">
        <div className="bg" style={{backgroundColor: bgColor, backgroundImage: `url('${bgImage}')`}}/>
        <div className="profile-box">
          <div className="profile-image"/>
          <div className="profile-name">John Wick</div>
          <div className="profile-title">Fortis Fortuna Adiuvat</div>
          <div className="profile-description">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras venenatis faucibus eleifend. Nullam
              placerat tellus tellus, in molestie diam volutpat dictum. Nam a diam ante. Nunc aliquam mollis felis sit
              amet elementum. Cras nec nulla et neque porta varius. Curabitur enim quam, venenatis malesuada ante vitae,
              pulvinar malesuada sem. Fusce euismod vitae lorem eu semper. Suspendisse potenti. Proin ornare ligula eget
              tristique aliquet.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras venenatis faucibus eleifend. Nullam
              placerat tellus tellus, in molestie diam volutpat dictum. Nam a diam ante. Nunc aliquam mollis felis sit
              amet elementum. Cras nec nulla et neque porta varius. Curabitur enim quam, venenatis malesuada ante vitae,
              pulvinar malesuada sem. Fusce euismod vitae lorem eu semper. Suspendisse potenti. Proin ornare ligula eget
              tristique aliquet.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras venenatis faucibus eleifend. Nullam
              placerat tellus tellus, in molestie diam volutpat dictum. Nam a diam ante. Nunc aliquam mollis felis sit
              amet elementum. Cras nec nulla et neque porta varius. Curabitur enim quam, venenatis malesuada ante vitae,
              pulvinar malesuada sem. Fusce euismod vitae lorem eu semper. Suspendisse potenti. Proin ornare ligula eget
              tristique aliquet.</p>
          </div>
        </div>
      </div>
    )
  }
}


export default injectIntl(Editor)