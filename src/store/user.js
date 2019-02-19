export const LOGGED_IN = 'user/LOGGED_IN';

const initialState = null;

/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return action.payload;
    default:
      return state;
  }
}

/* Actions */

export const login = (username) => {
  return (dispatch) => {
    dispatch(loggedIn(username));
  }
};

/* Action creators */

export const loggedIn = (username) => ({
  type: LOGGED_IN,
  payload: username
});