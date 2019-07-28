import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button} from 'react-bootstrap';

import Tour from 'reactour';

import publishBtn from '../../../images/publish.png';


class AppTour extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({visible: true});
    }, 1000);
  }

  disable = () => {
    this.resetAction();
    const {toggleUiProp} = this.props;
    toggleUiProp('guideTour');
  };

  focusElem = (selector) => {
    const elem = document.querySelector(selector);
    if (elem) {
      elem.classList.add('tour-mode');
    }
  };

  blurElem = (selector) => {
    const elem = document.querySelector(selector);
    if (elem) {
      elem.classList.remove('tour-mode');
    }
  };


  resetAction = () => {
    this.blurElem('.publish-toolbar .user-address');
    this.blurElem('.publish-toolbar .btn-edit-alias');
    this.blurElem('.design-toolbar .right-menu');
    this.blurElem('.profile-box .profile-photo');
    this.blurElem('.profile-box .profile-name');
    this.blurElem('.profile-box .profile-description');
    this.blurElem('.design-toolbar .left-menu');
    this.blurElem('.design-toolbar .middle-menu');
    this.blurElem('.design-toolbar .right-menu');
  };

  render() {

    const {visible} = this.state;

    if (!visible) {
      return null;
    }

    const steps = [
      {
        content: ({goTo}) => (
          <div className="guide-text">
            <h3>Your page has created <span aria-label="tada" role="img">🎉</span></h3>
            <p>
              Welcome again, this dialog will guide you through everything you need to know to start using Lander.
            </p>
            <div className="btns">
              <Button onClick={this.disable} variant="outline-secondary" className="btn-skip">Skip</Button>
              <Button onClick={() => goTo(1)} variant="primary" className="btn-start">Start</Button>
            </div>
          </div>
        ),
        action: () => {
          this.resetAction();
        }
      },
      {
        content: ({goTo}) => (
          <div className="guide-text">
            <p>
              This is your home page's address.
            </p>
            <div className="btns">
              <Button onClick={() => goTo(0)} variant="outline-primary" className="btn-prev">Prev</Button>
              <Button onClick={() => goTo(2)} variant="primary" className="btn-next">Next</Button>
            </div>
          </div>
        ),
        selector: '.publish-toolbar .user-address',
        position: 'bottom',
        action: () => {
          this.resetAction();
          this.focusElem('.publish-toolbar .user-address');
        }
      },
      {
        content: ({goTo}) => (
          <div className="guide-text">
            <p>
              You can customise your home page address by creating an alias.
            </p>
            <div className="btns">
              <Button onClick={() => goTo(1)} variant="outline-primary" className="btn-prev">Prev</Button>
              <Button onClick={() => goTo(3)} variant="primary" className="btn-next">Next</Button>
            </div>
          </div>
        ),
        selector: '.publish-toolbar .btn-edit-alias',
        position: 'bottom',
        action: () => {
          this.resetAction();
          this.focusElem('.publish-toolbar .btn-edit-alias');
        }
      },
      {
        content: ({goTo}) => (
          <div className="guide-text">
            <p>You can change style of your page by clicking this button.</p>
            <div className="btns">
              <Button onClick={() => goTo(2)} variant="outline-primary" className="btn-prev">Prev</Button>
              <Button onClick={() => goTo(4)} variant="primary" className="btn-next">Next</Button>
            </div>
          </div>
        ),
        selector: '.design-toolbar .left-menu button',
        action: () => {
          this.resetAction();
          this.focusElem('.design-toolbar .left-menu');
        }
      },
      {
        content: ({goTo}) => (
          <div className="guide-text">
            <p>You can edit all sections by clicking edit the button on each of them.</p>
            <div className="btns">
              <Button onClick={() => goTo(3)} variant="outline-primary" className="btn-prev">Prev</Button>
              <Button onClick={() => goTo(5)} variant="primary" className="btn-next">Next</Button>
            </div>
          </div>
        ),
        selector: '.profile-box .profile-name',
        action: () => {
          this.resetAction();
          this.focusElem('.profile-box .profile-name');
        }
      },
      {
        content: ({goTo}) => (
          <div className="guide-text">
            <p>Once you change any part of your page this button will appear.</p>
            <img src={publishBtn} height={80} alt="publish"/>
            <p>Click publish button when you are ready to update your page.</p>
            <div className="btns">
              <Button onClick={() => goTo(4)} variant="outline-primary" className="btn-prev">Prev</Button>
              <Button onClick={() => goTo(6)} variant="primary" className="btn-next">Next</Button>
            </div>
          </div>
        ),
        action: () => {
          this.resetAction();
        }
      },
      {
        content: ({goTo}) => (
          <div className="guide-text">
            <p>This button allows you to preview how your page will look after published it.</p>
            <div className="btns">
              <Button onClick={() => goTo(5)} variant="outline-primary" className="btn-prev">Prev</Button>
              <Button onClick={() => goTo(7)} variant="primary" className="btn-next">Next</Button>
            </div>
          </div>
        ),
        selector: '.design-toolbar .middle-menu button',
        action: () => {
          this.resetAction();
          this.focusElem('.design-toolbar .middle-menu');
        }
      },

      {
        content: ({goTo}) => (
          <div className="guide-text">
            <p>After you finish editing your page you can share it on social networks.</p>
            <div className="btns">
              <Button onClick={() => goTo(6)} variant="outline-primary" className="btn-prev">Prev</Button>
              <Button onClick={() => goTo(8)} variant="primary" className="btn-next">Next</Button>
            </div>
          </div>
        ),
        selector: '.design-toolbar .right-menu button',
        action: () => {
          this.resetAction();
          this.focusElem('.design-toolbar .right-menu');
        }
      },

      {
        content: ({goTo}) => (
          <div className="guide-text">
            <p>
              Now you are ready to use Lander.
            </p>
            <div className="btns">
              <Button onClick={() => goTo(7)} variant="outline-primary" className="btn-prev">Prev</Button>
              <Button onClick={this.disable} variant="primary" className="btn-end">End Tour</Button>
            </div>
          </div>
        ),
        action: () => {
          this.resetAction();
        }
      }
    ];

    return <Tour
      steps={steps}
      isOpen
      onRequestClose={this.disable}
      rounded={8}
      closeWithMask={false}
      disableKeyboardNavigation={['esc']}
      showNavigation={false}
      showButtons={false}
      showCloseButton={false}
      className="tour-guide"
    />
  }
}


AppTour.defaultProps = {
  toggleUiProp: () => {
  }
};

AppTour.propTypes = {
  toggleUiProp: PropTypes.func
};

export default AppTour;

