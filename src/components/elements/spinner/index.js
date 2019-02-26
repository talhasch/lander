import React, {Component} from 'react';


class Spinner extends Component {
  render() {
    return <div className="spinner">
      <div className="double-bounce1"/>
      <div className="double-bounce2"/>
    </div>
  }
}


export default Spinner;