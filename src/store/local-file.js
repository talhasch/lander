export const UPDATED = 'local-file/UPDATED';


const initialState = {};

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
    dispatch(updated(obj));
  }
};

/* Action creators */

export const updated = (data) => ({
  type: UPDATED,
  payload: data
});