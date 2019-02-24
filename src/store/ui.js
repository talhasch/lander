import {USER_LOGOUT} from './user';

export const TOGGLE_SETTINGS = '@ui/TOGGLE_SETTINGS';
export const TOGGLE_STYLE = '@ui/TOGGLE_STYLE';
export const TOGGLE_IMAGE_SELECT = '@ui/IMAGE_SELECT';
export const TOGGLE_DELETE = '@ui/TOGGLE_DELETE';
export const TOGGLE_BIO = '@ui/TOGGLE_BIO';
export const TOGGLE_PREVIEW = '@ui/TOGGLE_PREVIEW';
export const TOGGLE_ACCOUNT_EDIT = '@ui/TOGGLE_ACCOUNT_EDIT';
export const TOGGLE_SKIP_ACCOUNT_DIALOG = '@ui/TOGGLE_SKIP_ACCOUNT_DIALOG';

const initialState = {
  settings: false,
  delete: false,
  style: false,
  bio: false,
  imageSelect: false,
  preview: false,
  accountEdit: false,
  skipAccountDialog: Boolean(parseInt(localStorage.getItem('skip-account-dialog'), 10))
};

/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return initialState;
    case TOGGLE_SETTINGS:
      return Object.assign({}, state, {settings: action.payload});
    case TOGGLE_STYLE:
      return Object.assign({}, state, {style: action.payload});
    case TOGGLE_IMAGE_SELECT:
      return Object.assign({}, state, {imageSelect: action.payload});
    case TOGGLE_PREVIEW:
      return Object.assign({}, state, {preview: action.payload});
    case TOGGLE_ACCOUNT_EDIT:
      return Object.assign({}, state, {accountEdit: action.payload});
    case TOGGLE_SKIP_ACCOUNT_DIALOG:
      return Object.assign({}, state, {skipAccountDialog: action.payload});
    default:
      return state;
  }
}

/* Actions */

export const toggleUiProp = (what) => {
  return async (dispatch, getState) => {
    const {ui} = getState();

    let act;

    switch (what) {
      case 'settings':
        act = TOGGLE_SETTINGS;
        break;
      case 'style':
        act = TOGGLE_STYLE;
        break;
      case 'delete':
        act = TOGGLE_DELETE;
        break;
      case 'bio':
        act = TOGGLE_BIO;
        break;
      case 'imageSelect':
        act = TOGGLE_IMAGE_SELECT;
        break;
      case 'preview':
        act = TOGGLE_PREVIEW;
        break;
      case 'accountEdit':
        act = TOGGLE_ACCOUNT_EDIT;
        break;
      case 'skipAccountDialog':
        act = TOGGLE_SKIP_ACCOUNT_DIALOG;
        break;
      default:
        act = '';
        break;
    }

    dispatch({
      type: act,
      payload: !ui[what]
    });
  }
};
