import {USER_LOGOUT} from './user';

export const TOGGLE_SETTINGS = '@dialogs/TOGGLE_SETTINGS';
export const TOGGLE_STYLE = '@dialogs/TOGGLE_STYLE';
export const TOGGLE_IMAGE_SELECT = '@dialogs/IMAGE_SELECT';
export const TOGGLE_DELETE = '@dialogs/TOGGLE_DELETE';
export const TOGGLE_BIO = '@dialogs/TOGGLE_BIO';


const initialState = {
  settings: false,
  delete: false,
  style: false,
  bio: false,
  imageSelect: false
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
    default:
      return state;
  }
}

/* Actions */

export const toggleDialog = (what) => {
  return async (dispatch, getState) => {
    const {dialogs} = getState();

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
      default:
        act = '';
        break;
    }

    dispatch({
      type: act,
      payload: !dialogs[what]
    });
  }
};
