export const ACTIVE_USER_SET = 'active-user/SET';

const initialState = null;

/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE_USER_SET:
      return action.payload;
    default:
      return state;
  }
}

/* Actions */

export const setActiveUser = (username) => {
  return (dispatch) => {
    dispatch(activeUserSet(username));
  }
};

/* Action creators */

export const activeUserSet = (username) => ({
  type: ACTIVE_USER_SET,
  payload: username
});