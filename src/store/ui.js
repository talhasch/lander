import {USER_LOGOUT} from './user';

export const TOGGLE_SETTINGS = '@ui/TOGGLE_SETTINGS';
export const TOGGLE_STYLE = '@ui/TOGGLE_STYLE';
export const TOGGLE_IMAGE_SELECT = '@ui/IMAGE_SELECT';
export const TOGGLE_DELETE = '@ui/TOGGLE_DELETE';
export const TOGGLE_BIO = '@ui/TOGGLE_BIO';
export const TOGGLE_PREVIEW = '@ui/TOGGLE_PREVIEW';

const initialState = {
  settings: false,
  delete: false,
  style: false,
  bio: false,
  imageSelect: false,
  preview: false
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
