import React, {Component} from 'react';

import {injectIntl} from 'react-intl';


import {bindActionCreators} from "redux";
import {logout} from "../../store/user";
import connect from "react-redux/es/connect/connect";

import ProfileImage from '../../components/profile-image';
import ProfileName from '../../components/profile-name';
import ProfileDescription from '../../components/profile-description';
import ProfileBg from '../../components/profile-bg';
import SocialAccounts from '../../components/social-accounts';
import WalletAccounts from '../../components/wallet-accounts';

class Navbar extends Component {
  logout = (e) => {
    e.preventDefault();
    const {logout, history} = this.props;
    logout();
    history.push('/');
  };

  render() {
    return (
      <div className="editor-header">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/" onClick={(e) => {
            e.preventDefault();
            const {history} = this.props;
            history.push('/')
          }}>
            <img src="/docs/4.3/assets/brand/bootstrap-solid.svg" width="30" height="30"
                 className="d-inline-block align-top" alt=""/>
            Lander
          </a>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={this.logout}>Logout</a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

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


  }


  render() {
    const {user} = this.props;
    if (!(user && user.loaded)) {
      return null;
    }

    const {name, description, image, account} = user.profile;


    return (
      <div className="main-wrapper">
        <div className="bg"/>
        <ProfileBg bg={user.privateData.bg}/>
        <Navbar {...this.props} />


        <div className="profile-box">
          <ProfileImage image={image} {...this.props} />
          <ProfileName name={name} {...this.props}/>
          <ProfileDescription description={description} {...this.props}/>
          <div className="profile-bio">

          </div>
          <SocialAccounts accounts={account} editMode/>
          <WalletAccounts accounts={account} editMode/>
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
      logout
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Editor))