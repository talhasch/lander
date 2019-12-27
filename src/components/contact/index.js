/*
eslint-disable jsx-a11y/anchor-is-valid
*/

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal} from 'react-bootstrap';

import EditBtn from '../elements/edit-btn';

import {envelopeSvg, phoneSvg, globeSvg, mapMarker} from '../../svg';

export class ContactDialogContent extends Component {
  render() {
    const {contact} = this.props;
    const {email, phone, website, address} = contact;

    return (
      <>
        <div className="contact-dialog-body">

          {email && (<div className="contact-section">
            <div className="section-icon">
              {envelopeSvg}
            </div>
            <a href={`mailto:${email}`} className="section-label">{email}</a>
          </div>)
          }

          {phone && (<div className="contact-section">
            <div className="section-icon">
              {phoneSvg}
            </div>
            <a href={`tel:${phone}`} className="section-label">{phone}</a>
          </div>)
          }

          {website && (<div className="contact-section">
            <div className="section-icon">
              {globeSvg}
            </div>
            <a href={website} target="_blank" rel="noopener noreferrer" className="section-label">{website}</a>
          </div>)
          }

          {address && (<div className="contact-section">
            <div className="section-icon">
              {mapMarker}
            </div>
            <div className="section-label">{address}</div>
          </div>)
          }
        </div>
      </>
    )
  }
}

ContactDialogContent.defaultProps = {
  contact: {}
};

ContactDialogContent.propTypes = {
  contact: PropTypes.shape({})
};

class ContactDialog extends Component {

  hide = () => {
    const {hide} = this.props;
    hide();
  };

  render() {
    const {name} = this.props;

    return (
      <>
        <Modal show centered onHide={this.hide} className="contact-dialog">
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ContactDialogContent {...this.props} />
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

ContactDialog.defaultProps = {
  contact: {}
};

ContactDialog.propTypes = {
  name: PropTypes.string.isRequired,
  contact: PropTypes.shape({})
};


class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialog: false
    }
  }

  edit = () => {
    const {toggleUiProp} = this.props;

    if (toggleUiProp) {
      toggleUiProp('contactEdit');
    }
  };

  toggleDialog = (e) => {
    if (e) {
      e.preventDefault();
    }

    const {dialog} = this.state;
    this.setState({dialog: !dialog});
  };

  render() {
    const {dialog} = this.state;
    const {contact, editMode} = this.props;
    const userHasAny = !!Object.values(contact).find(x => x);

    if (!userHasAny) {
      return null;
    }

    if (editMode) {
      return <div className="contact edit-mode">
        <EditBtn {...this.props} onClick={this.edit}/>
        <a className="contact-button">Contact Me</a>
      </div>;
    }

    return <div className="contact">
      <a className="contact-button" href="#contact" onClick={this.toggleDialog}>Contact Me</a>
      {dialog && <ContactDialog {...this.props} hide={this.toggleDialog}/>}
    </div>;
  }
}


Contact.defaultProps = {
  editMode: false,
  contact: {}
};

Contact.propTypes = {
  editMode: PropTypes.bool,
  contact: PropTypes.shape({})
};

export default Contact;
