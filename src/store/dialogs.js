import {USER_LOGOUT} from './user';

export const TOGGLE_SETTINGS = '@dialogs/TOGGLE_SETTINGS';
export const TOGGLE_DELETE = '@dialogs/TOGGLE_DELETE';


const initialState = {
  settings: false,
  delete: false
};

/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return initialState;
    case TOGGLE_SETTINGS:
      return Object.assign({}, state, {settings: action.payload});
    default:
      return state;
  }
}

/* Actions */

export const toggleSettings = () => {
  return async (dispatch, getState) => {
    const {dialogs} = getState();

    dispatch({
      type: TOGGLE_SETTINGS,
      payload: !dialogs.settings
    });
  }
};
