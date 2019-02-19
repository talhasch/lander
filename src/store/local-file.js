import md5 from 'blueimp-md5';
import {getPrivateFile} from '../db';


export const UPDATED = 'local-file/UPDATED';

const initialState = getPrivateFile() || {};

/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATED:
      return action.payload;
    default:
      return state;
  }
}

/* Actions */

export const updateLocalFile = (obj) => {
  return (dispatch) => {
    const hash = md5(JSON.stringify(obj));
    const newObj = Object.assign({}, obj, {hash});

    localStorage.setItem('lander-local-profile', JSON.stringify(newObj));

    dispatch(updated(newObj));
  }
};

/* Action creators */

export const updated = (data) => ({
  type: UPDATED,
  payload: data
});