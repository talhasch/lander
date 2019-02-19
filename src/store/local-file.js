import md5 from 'blueimp-md5';

import {ACTIVE_USER_SET} from './activeUser';

export const UPDATED = 'local-file/UPDATED';

const initialState = null;

const getLocalFile = (username) => {
  const val = localStorage.getItem(`lander-local-profile-${username}`);

  if (val) {
    return JSON.parse(val);
  }

  return null;
};

/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATED:
      return action.payload;
    case ACTIVE_USER_SET:
      return getLocalFile(action.payload);
    default:
      return state;
  }
}

/* Actions */

export const updateLocalFile = (obj) => {
  return (dispatch, getState) => {

    const {activeUser} = getState();

    const hash = md5(JSON.stringify(obj));
    const newObj = Object.assign({}, obj, {hash});

    localStorage.setItem(`lander-local-profile-${activeUser}`, JSON.stringify(newObj));

    dispatch(updated(newObj));
  }
};

/* Action creators */

export const updated = (data) => ({
  type: UPDATED,
  payload: data
});