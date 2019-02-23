import md5 from 'blueimp-md5';

import {TOGGLE_STYLE} from './dialogs';

const blockstack = require('blockstack');

export const USER_LOGIN = '@user/LOGIN';
export const USER_LOGOUT = '@user/LOGOUT';

export const DATA_LOADED = '@user/DATA_LOADED';
export const PROFILE_LOADED = '@user/PROFILE_LOADED';


export const BG_IMAGE_SET = '@user/BG_IMAGE_SET';
export const BG_COLOR_SET = '@user/BG_COLOR_SET';
export const BG_BLUR_SET = '@user/BG_BLUR_SET';
export const BG_SAVE = '@user/BG_SAVE';


const dataModel = () => (
  {
    email: null,
    bg: {
      image: 'wave.jpg',
      color: '#4a96f7',
      blur: '2'
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
    case PROFILE_LOADED: {
      return Object.assign({}, state, {profile: action.payload});
    }
    case DATA_LOADED: {
      const {privateData, publicData} = action.payload;

      return Object.assign({}, state, {privateData, publicData, loaded: true});
    }
    case TOGGLE_STYLE: {
      const {privateData} = state;
      let newPrivateData;
      if (privateData.bgTemp) {
        const {bgTemp} = privateData;
        const {bgTemp: delTemp, ...privateData1} = privateData;
        newPrivateData = Object.assign({}, privateData1, {bg: bgTemp});
      } else {
        const {bg} = privateData;
        newPrivateData = Object.assign({}, privateData, {bgTemp: bg});
      }
      return Object.assign({}, state, {privateData: newPrivateData});
    }
    case BG_BLUR_SET: {
      const {privateData} = state;
      const {bg} = privateData;
      const newPrivateData = Object.assign({}, privateData, {bg: Object.assign({}, bg, {blur: action.payload})});
      return Object.assign({}, state, {privateData: newPrivateData});
    }
    case BG_IMAGE_SET: {

      const {privateData} = state;
      const {bg} = privateData;

      let newVal = action.payload;
      if (action.payload === 'recover') {
        const {bgTemp} = privateData;
        ({image: newVal} = bgTemp);
      }

      const newPrivateData = Object.assign({}, privateData, {bg: Object.assign({}, bg, {image: newVal})});
      return Object.assign({}, state, {privateData: newPrivateData});
    }
    case BG_COLOR_SET: {
      const {privateData} = state;
      const {bg} = privateData;
      const newPrivateData = Object.assign({}, privateData, {bg: Object.assign({}, bg, {color: action.payload})});
      return Object.assign({}, state, {privateData: newPrivateData});
    }
    case USER_LOGOUT: {
      return initialState;
    }
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
      const file = await blockstack.getFile('lander-private-file');
      privateData = JSON.parse(file);
    } catch (e) {
      console.error(`File get error. ${e}`);
      privateData = null;
    }

    if (privateData === null) {
      const obj = dataModel();
      try {
        await blockstack.putFile('lander-private-file', JSON.stringify(obj), {encrypt: true});
        privateData = Object.assign({}, obj);
      } catch (e) {
        console.error(`File put error. ${e}`);
      }
    }

    let publicData;
    try {
      publicData = await blockstack.getFile('lander-public-file');
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

export const setBgBlur = (val) => {
  return (dispatch) => {
    dispatch({
      type: BG_BLUR_SET,
      payload: val
    });
  }
};

export const setBgImage = (val) => {
  return (dispatch) => {
    dispatch({
      type: BG_IMAGE_SET,
      payload: val
    });
  }
};

export const setBgColor = (val) => {
  return (dispatch) => {
    dispatch({
      type: BG_COLOR_SET,
      payload: val
    });
  }
};

export const saveBg = () => {
  return (dispatch, getState) => {

    const {privateData} = getState();

    console.log(privateData);

    dispatch({
      type: BG_SAVE
    });
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