import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Button} from 'react-bootstrap';

import Tour from 'reactour';

import publishBtn from '../../../images/publish.png';


class AppTour extends Component {
  disable = () => {
    this.resetAction();
    const {toggleUiProp} = this.props;
    toggleUiProp('guideTour');
  };

  resetAction = () => {
    document.querySelector('.publish-toolbar .user-address').classList.remove('tour-mode');
    document.querySelector('.design-toolbar .right-menu').classList.remove('tour-mode');
    document.querySelector('.profile-box .profile-photo').classList.remove('tour-mode');
    document.querySelector('.profile-box .profile-name').classList.remove('tour-mode');
    document.querySelector('.profile-box .profile-description').classList.remove('tour-mode');
    document.querySelector('.design-toolbar .left-menu').classList.remove('tour-mode');
  };

  render() {
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
          document.querySelector('.publish-toolbar .user-address').classList.add('tour-mode');
        }
      },
      {
        content: ({goTo}) => (
          <div className="guide-text">
            <p>You can change style of your page by clicking this button.</p>
            <div className="btns">
              <Button onClick={() => goTo(1)} variant="outline-primary" className="btn-prev">Prev</Button>
              <Button onClick={() => goTo(3)} variant="primary" className="btn-next">Next</Button>
            </div>
          </div>
        ),
        selector: '.design-toolbar .right-menu button',
        action: () => {
          this.resetAction();
          document.querySelector('.design-toolbar .right-menu').classList.add('tour-mode');
        }
      },
      {
        content: ({goTo}) => (
          <div className="guide-text">
            <p>You can edit all sections by clicking edit button on each of them.</p>
            <div className="btns">
              <Button onClick={() => goTo(2)} variant="outline-primary" className="btn-prev">Prev</Button>
              <Button onClick={() => goTo(4)} variant="primary" className="btn-next">Next</Button>
            </div>
          </div>
        ),
        selector: '.profile-box .profile-photo',
        action: () => {
          this.resetAction();
          document.querySelector('.profile-box .profile-photo').classList.add('tour-mode');
        }
      },
      {
        content: ({goTo}) => (
          <div className="guide-text">
            <p>You can edit all sections by clicking edit button on each of them.</p>
            <div className="btns">
              <Button onClick={() => goTo(3)} variant="outline-primary" className="btn-prev">Prev</Button>
              <Button onClick={() => goTo(5)} variant="primary" className="btn-next">Next</Button>
            </div>
          </div>
        ),
        selector: '.profile-box .profile-name',
        action: () => {
          this.resetAction();
          document.querySelector('.profile-box .profile-name').classList.add('tour-mode');
        }
      },
      {
        content: ({goTo}) => (
          <div className="guide-text">
            <p>You can edit all sections by clicking edit button on each of them.</p>
            <div className="btns">
              <Button onClick={() => goTo(4)} variant="outline-primary" className="btn-prev">Prev</Button>
              <Button onClick={() => goTo(6)} variant="primary" className="btn-next">Next</Button>
            </div>
          </div>
        ),
        selector: '.profile-box .profile-description',
        action: () => {
          this.resetAction();
          document.querySelector('.profile-box .profile-description').classList.add('tour-mode');
        }
      },
      {
        content: ({goTo}) => (
          <div className="guide-text">
            <p>Once you change any part of your page this button will appear.</p>
            <img src={publishBtn} height={80} alt="publish"/>
            <p>Click publish button when you are ready to update your page.</p>
            <div className="btns">
              <Button onClick={() => goTo(5)} variant="outline-primary" className="btn-prev">Prev</Button>
              <Button onClick={() => goTo(7)} variant="primary" className="btn-next">Next</Button>
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
            <p>This button allows you to preview how your page will see after published it.</p>
            <div className="btns">
              <Button onClick={() => goTo(6)} variant="outline-primary" className="btn-prev">Prev</Button>
              <Button onClick={() => goTo(8)} variant="primary" className="btn-next">Next</Button>
            </div>
          </div>
        ),
        selector: '.design-toolbar .left-menu button',
        action: () => {
          this.resetAction();
          document.querySelector('.design-toolbar .left-menu').classList.add('tour-mode');
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

