import React, {Component} from 'react';

import connect from 'react-redux/es/connect/connect';

import HomePage from '../../components/pages/home'

class HomeContainer extends Component {
  render() {
    return <HomePage {...this.props} />;
  }
}


const mapStateToProps = ({activeUser}) => ({
  activeUser
});

export default connect(
  mapStateToProps,
  {}
)(HomeContainer)