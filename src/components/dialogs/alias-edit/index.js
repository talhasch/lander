import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Modal, Button, FormControl, FormText, InputGroup, Tooltip, OverlayTrigger} from 'react-bootstrap';

import {FormattedMessage} from 'react-intl';

import {Alias} from '../../../model';

import ConfirmDialog from '../confirm';

import {getUsername} from '../../../blockstack-config';

import {aliasRe} from '../../../constants';

import {infoSvg} from "../../../svg";

class AliasEditDialog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      alias: '',
      aliasErr: false,
      aliasInUse: false,
      submitted: false,
      updating: false,
      deleting: false,
      deleteConfirm: false,
      canDelete: false
    }
  };

  componentDidMount() {
    this.focus();

    const {user} = this.props;

    if (user.alias) {
      this.setState({alias: user.alias, canDelete: true});
    }
  };

  focus = () => {
    document.getElementById('alias-txt').focus();
  };

  hide = () => {
    const {afterHide, toggleUiProp} = this.props;
    toggleUiProp('alias');
    afterHide();
  };

  isValidAlias = (a) => {
    if (a.trim() === '') {
      return true;
    }

    return aliasRe.test(a);
  };

  textChanged = (e) => {
    const val = e.target.value;
    this.setState({alias: val, aliasErr: !this.isValidAlias(val)});
  };

  refresh = () => {
    // refreshing window when alias changed is reasonable approach.
    window.location.reload();
  };

  delete = () => {
    this.setState({deleteConfirm: true});
  };

  deleteCancelled = () => {
    this.setState({deleteConfirm: false});
  };

  deleteConfirmed = async () => {
    this.setState({deleteConfirm: false, deleting: true});
    const aliases = await Alias.fetchOwnList({sort: 'createdAt'});
    const [al,] = aliases;
    al.update({
      alias: ''
    });
    await al.save();
    this.refresh();
  };

  save = async () => {
    const {alias} = this.state;
    const aliasCheck = this.isValidAlias(alias);
    this.setState({submitted: true, aliasInUse: false, aliasErr: !aliasCheck, updating: true});

    if (!aliasCheck) {
      this.setState({updating: false});
      this.focus();
      return;
    }

    // keep 1 user <-> 1 alias
    const username = getUsername();

    const checkList = await Alias.fetchList({alias});
    if (checkList.length > 0 && checkList.find(x => !x.isOwnedByUser())) {
      this.setState({aliasInUse: true, updating: false});
      this.focus();
      return;
    }

    const aList = await Alias.fetchOwnList({sort: 'createdAt'});
    if (aList.length > 0) {
      const [al,] = aList;
      al.update({
        alias
      });
      await al.save()
    } else {
      const al = new Alias({username, alias});
      await al.save();
    }

    this.refresh();
  };

  render() {
    const {alias, aliasErr, aliasInUse, submitted, updating, deleting, deleteConfirm, canDelete} = this.state;
    const danger = aliasErr && submitted;

    return (
      <>
        <Modal show onHide={this.hide}>
          <Modal.Header className="alias-edit-dialog-header" closeButton>
            <Modal.Title>Alias
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip>An alias allows you to customise your home page address. <br/> Might be useful to get a
                    shorter one.</Tooltip>
                }>
                {infoSvg}
              </OverlayTrigger>

            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="alias-edit-dialog-content">
              <InputGroup className="mb-3 ">
                <InputGroup.Prepend>
                  <InputGroup.Text>https://landr.me/</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="alias-txt" className={danger ? 'is-invalid' : ''}
                             placeholder="alias"
                             onChange={this.textChanged}
                             value={alias}
                             maxLength={10}
                />
              </InputGroup>
              <FormText className={danger ? 'text-danger' : 'text-muted'}>
                Only letters and numbers. Minimum 4, maximum 10 characters.
              </FormText>
              {aliasInUse &&
              <FormText className="text-danger">
                The alias is already in use.
              </FormText>
              }
            </div>
          </Modal.Body>
          <Modal.Footer className={canDelete ? 'd-flex justify-content-between' : ''}>
            {canDelete &&
            <Button variant="warning" onClick={this.delete} disabled={deleting}>
              Delete Alias {deleting ? '...' : ''}
            </Button>
            }
            <Button variant="primary" onClick={this.save} disabled={updating}>
              <FormattedMessage id="g.save"/> {updating ? '...' : ''}
            </Button>
          </Modal.Footer>
        </Modal>

        {deleteConfirm && <ConfirmDialog onCancel={this.deleteCancelled} onConfirm={this.deleteConfirmed}/>}
      </>
    )
  };
}

AliasEditDialog.defaultProps = {
  afterHide: () => {
  }
};

AliasEditDialog.propTypes = {
  toggleUiProp: PropTypes.func.isRequired,
  afterHide: PropTypes.func,
  user: PropTypes.shape({
    alias: PropTypes.string
  })
};

export default AliasEditDialog;
