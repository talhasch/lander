export const UPDATED = 'local/UPDATED';


const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

/* Actions */

export const updateProp = (prop, value) => {
  return (dispatch, getState) => {
    const data = {};
    dispatch(updated(data));
  }
};

/* Action creators */

export const updated = (data) => ({
  type: UPDATED,
  payload: data
});