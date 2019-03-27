import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Tour from 'reactour';

import publishBtn from '../../../images/publish.png';


class AppTour extends Component {
  onClose = () => {

  };

  render() {
    const steps = [
      {
        content: ({goTo}) => (
          <div className="guide-text">
            <h3>Your page has created <span aria-label="tada" role="img">🎉</span></h3>
            <p>
              Welcome again, this will guide you through everything you need to know to start using Lander.
            </p>
            <div className="btns">
              <Button variant="outline-secondary" className="btn-skip">Skip</Button>
              <Button onClick={() => goTo(1)} variant="primary" className="btn-start">Start</Button>
            </div>
          </div>
        ),
        action: () => {
          console.log("1")
        }
      },
      {
        content: ({goTo}) => (
          <div className="guide-text">
            <p>
              This is your public home page url.
            </p>
          </div>
        ),
        selector: '.publish-toolbar .user-address',
        position: 'bottom',
        action: () => {
          console.log("2")
        }
      },
      {
        content: <div className="guide-text">You can change style of your page clicking this button</div>,
        selector: '.design-toolbar .right-menu button',
      },
      {
        content: <span>You can edit all sections by clicking edit button each on them</span>,
        selector: '.profile-box .profile-photo',
      },
      {
        content: <span>You can edit all sections by clicking edit button each on them</span>,
        selector: '.profile-box  .profile-name',
      },
      {
        content: <span>This button allows you to preview how your page will see actually</span>,
        selector: '.design-toolbar .left-menu button',
      },
      {
        content: ({goTo}) => (
          <div className="guide-text">
            <p>
              Once you change any part of your page this button will appear.
            </p>
            <img src={publishBtn} height={80} alt="publish"/>
            <p>Click publish button when you are ready to update your page.</p>
          </div>
        )
      },
      {
        content: ({goTo}) => (
          <div className="guide-text">
            <p>
              You are ready to use Lander.
            </p>
            <div className="btns">

              <Button onClick={this.onClose} variant="primary" className="btn-end">End Tour</Button>
            </div>
          </div>
        )
      }
    ];

    return <Tour
      steps={steps}
      isOpen={true}
      onRequestClose={this.onClose}
      rounded={8}
      className="tour-guide"
    />
  }
}


export default AppTour;