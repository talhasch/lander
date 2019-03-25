import {USER_LOGOUT} from './user';

export const TOGGLE_PHOTO_UPLOAD = '@ui/TOGGLE_PHOTO_UPLOAD';
export const TOGGLE_NAME_EDIT = '@ui/TOGGLE_NAME_EDIT';
export const TOGGLE_DESCRIPTION_EDIT = '@ui/TOGGLE_DESCRIPTION_EDIT';
export const TOGGLE_BIO_EDIT = '@ui/TOGGLE_BIO_EDIT';
export const TOGGLE_ACCOUNT_EDIT = '@ui/TOGGLE_ACCOUNT_EDIT';
export const TOGGLE_WALLET_EDIT = '@ui/TOGGLE_WALLET_EDIT';
export const TOGGLE_STYLE = '@ui/TOGGLE_STYLE';
export const TOGGLE_IMAGE_SELECT = '@ui/IMAGE_SELECT';
export const TOGGLE_SETTINGS = '@ui/TOGGLE_SETTINGS';
export const TOGGLE_DELETE = '@ui/TOGGLE_DELETE';
export const TOGGLE_PREVIEW = '@ui/TOGGLE_PREVIEW';


const initialState = {
  photoUpload: false,
  nameEdit: false,
  descriptionEdit: false,
  bioEdit: false,
  accountEdit: false,
  walletEdit: false,
  style: false,
  imageSelect: false,
  settings: false,
  delete: false,
  preview: false,
  skipAccountDialog: Boolean(parseInt(localStorage.getItem('skip-account-dialog'), 10))
};

/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return initialState;
    case TOGGLE_PHOTO_UPLOAD:
      return Object.assign({}, state, {photoUpload: action.payload.what});
    case TOGGLE_NAME_EDIT:
      return Object.assign({}, state, {nameEdit: action.payload.what});
    case TOGGLE_DESCRIPTION_EDIT:
      return Object.assign({}, state, {descriptionEdit: action.payload.what});
    case TOGGLE_BIO_EDIT:
      return Object.assign({}, state, {bioEdit: action.payload.what});
    case TOGGLE_ACCOUNT_EDIT:
      return Object.assign({}, state, {accountEdit: action.payload.what});
    case TOGGLE_STYLE:
      return Object.assign({}, state, {style: action.payload.what});
    case TOGGLE_IMAGE_SELECT:
      return Object.assign({}, state, {imageSelect: action.payload.what});
    case TOGGLE_SETTINGS:
      return Object.assign({}, state, {settings: action.payload.what});
    case TOGGLE_PREVIEW:
      return Object.assign({}, state, {preview: action.payload.what});

    default:
      return state;
  }
}

/* Actions */

export const toggleUiProp = (what, affectUser = true) => {
  return async (dispatch, getState) => {
    const {ui} = getState();

    let act;

    switch (what) {
      case 'photoUpload':
        act = TOGGLE_PHOTO_UPLOAD;
        break;
      case 'nameEdit':
        act = TOGGLE_NAME_EDIT;
        break;
      case 'descriptionEdit':
        act = TOGGLE_DESCRIPTION_EDIT;
        break;
      case 'bioEdit':
        act = TOGGLE_BIO_EDIT;
        break;
      case 'accountEdit':
        act = TOGGLE_ACCOUNT_EDIT;
        break;
      case 'walletEdit':
        act = TOGGLE_WALLET_EDIT;
        break;
      case 'style':
        act = TOGGLE_STYLE;
        break;
      case 'imageSelect':
        act = TOGGLE_IMAGE_SELECT;
        break;
      case 'settings':
        act = TOGGLE_SETTINGS;
        break;
      case 'delete':
        act = TOGGLE_DELETE;
        break;
      case 'preview':
        act = TOGGLE_PREVIEW;
        break;
      default:
        act = '';
        break;
    }

    dispatch({
      type: act,
      payload: {what: !ui[what], affectUser}
    });
  }
};
