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
export const TOGGLE_SHARE = '@ui/TOGGLE_SHARE';
export const TOGGLE_ALIAS_EDIT = '@ui/TOGGLE_ALIAS_EDIT';
export const TOGGLE_GUIDE = '@ui/TOGGLE_GUIDE';

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
  share: false,
  alias: false,
  guideTour: !localStorage.getItem('guide-tour-disable')
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
    case TOGGLE_WALLET_EDIT:
      return Object.assign({}, state, {walletEdit: action.payload.what});
    case TOGGLE_STYLE:
      return Object.assign({}, state, {style: action.payload.what});
    case TOGGLE_IMAGE_SELECT:
      return Object.assign({}, state, {imageSelect: action.payload.what});
    case TOGGLE_SETTINGS:
      return Object.assign({}, state, {settings: action.payload.what});
    case TOGGLE_PREVIEW:
      return Object.assign({}, state, {preview: action.payload.what});
    case TOGGLE_SHARE:
      return Object.assign({}, state, {share: action.payload.what});
    case TOGGLE_ALIAS_EDIT:
      return Object.assign({}, state, {alias: action.payload.what});
    case TOGGLE_GUIDE:
      return Object.assign({}, state, {guideTour: action.payload.what});
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
      case 'share':
        act = TOGGLE_SHARE;
        break;
      case 'alias':
        act = TOGGLE_ALIAS_EDIT;
        break;
      case 'guideTour':
        act = TOGGLE_GUIDE;
        localStorage.setItem('guide-tour-disable', '1');
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
