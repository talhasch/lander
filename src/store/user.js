import md5 from 'blueimp-md5';

const blockstack = require('blockstack');

export const USER_LOGIN = '@user/LOGIN';
export const USER_LOGOUT = '@user/LOGOUT';

export const DATA_LOADED = '@user/DATA_LOADED';
export const PROFILE_LOADED = '@user/PROFILE_LOADED';


const dataModel = () => (
  {
    email: null,
    bg: {
      image: 'wave.jpg',
      color: '#4a96f7',
      blur: 2
    },
    hash: '0101010'
  }
);

const initialState = null;

/* Reducer */

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        username: action.payload,
        profile: null,
        privateData: null,
        publicData: null,
        loaded: false,
      };
    case PROFILE_LOADED:
      return Object.assign({}, state, {profile: action.payload});
    case DATA_LOADED:
      const {privateData, publicData} = action.payload;

      return Object.assign({}, state, {privateData, publicData, loaded: true});
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

/* Actions */

export const login = (userData) => {
  return async (dispatch) => {

    const {username, profile} = userData;

    dispatch(loggedIn(username));
    dispatch(profileLoaded(profile));

    let privateData;
    try {
      const file = await blockstack.getFile('lander-private');
      privateData = JSON.parse(file);
    } catch (e) {
      console.error(`File get error. ${e}`);
      privateData = null;
    }

    if (privateData === null) {
      const obj = dataModel();
      try {
        await blockstack.putFile('lander-private', JSON.stringify(obj), {encrypt: true});
        privateData = Object.assign({}, obj);
      } catch (e) {
        console.error(`File put error. ${e}`);
      }
    }

    let publicData;
    try {
      publicData = await blockstack.getFile('lander-public');
    } catch (e) {
      console.error(`File get error. ${e}`);
      publicData = null;
    }

    dispatch(dataLoaded(privateData, publicData));
  }
};

export const logout = () => {
  return (dispatch) => {
    dispatch(loggedOut());
    blockstack.signUserOut();
  }
};

/* Action creators */

export const loggedIn = (username) => ({
  type: USER_LOGIN,
  payload: username
});

export const profileLoaded = (profile) => ({
  type: PROFILE_LOADED,
  payload: profile
});

export const dataLoaded = (privateData, publicData) => ({
  type: DATA_LOADED,
  payload: {
    privateData,
    publicData
  }
});

export const loggedOut = () => ({
  type: USER_LOGOUT
});