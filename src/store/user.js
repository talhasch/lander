import {TOGGLE_STYLE, TOGGLE_BIO_EDIT} from './ui';

import {draftFile, publicFile} from '../constants';

const blockstack = require('blockstack');

export const USER_LOGIN = '@user/LOGIN';
export const USER_LOGOUT = '@user/LOGOUT';

export const DATA_LOADED = '@user/DATA_LOADED';
export const PROFILE_LOADED = '@user/PROFILE_LOADED';

export const BG_IMAGE_SET = '@user/BG_IMAGE_SET';
export const BG_COLOR_SET = '@user/BG_COLOR_SET';
export const BG_BLUR_SET = '@user/BG_BLUR_SET';
export const BG_SAVE = '@user/BG_SAVE';

export const BIO_SET = '@user/BIO_SAVE';

export const DRAFT_SAVE = '@user/DRAFT_SAVE';
export const DRAFT_SAVED = '@user/DRAFT_SAVED';
export const DRAFT_SAVE_ERR = '@user/DRAFT_SAVE_ERR';


const dataModel = () => (
  {
    email: '',
    bg: {
      image: 'wave.jpg',
      color: '#4a96f7',
      blur: '2'
    },
    bio: '',
    updated: Date.now()
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
        draftSaving: false,
        publicSaving: false
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
    case TOGGLE_BIO_EDIT: {
      const {privateData} = state;
      let newPrivateData;
      if (privateData.bioTemp !== undefined) {
        const {bioTemp} = privateData;
        const {bioTemp: delTemp, ...privateData1} = privateData;
        newPrivateData = Object.assign({}, privateData1, {bio: bioTemp});
      } else {
        const {bio} = privateData;
        newPrivateData = Object.assign({}, privateData, {bioTemp: bio});
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
    case BIO_SET: {
      const {privateData} = state;
      const newPrivateData = Object.assign({}, privateData, {bio: action.payload});
      return Object.assign({}, state, {privateData: newPrivateData});
    }
    case DRAFT_SAVE: {
      return Object.assign({}, state, {draftSaving: true});
    }
    case DRAFT_SAVED: {
      const {newData} = action.payload;

      return Object.assign({}, state, {privateData: newData, draftSaving: false});
    }
    case DRAFT_SAVE_ERR: {
      return Object.assign({}, state, {draftSaving: false});
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
      const file = await blockstack.getFile(draftFile);
      privateData = JSON.parse(file);
    } catch (e) {
      console.error(`File get error. ${e}`);
      privateData = null;
    }

    if (privateData === null) {
      const obj = dataModel();
      try {
        await blockstack.putFile(draftFile, JSON.stringify(obj), {encrypt: true});
        privateData = Object.assign({}, obj);
      } catch (e) {
        console.error(`File put error. ${e}`);
      }
    }

    let publicData;
    try {
      publicData = await blockstack.getFile(draftFile);
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

export const saveDraft = () => {
  return (dispatch, getState) => {

    dispatch(draftSave());

    const {user} = getState();
    const {bgTemp, bioTemp, ...draftData1} = user.privateData;
    draftData1.updated = Date.now();

    blockstack.putFile(draftFile, JSON.stringify(draftData1), {encrypt: true}).then(() => {
      dispatch(draftSaved(draftData1));
    }).catch(() => {
      dispatch(draftNotSaved());
    });
  }
};

export const setBio = (val) => {
  return (dispatch) => {
    dispatch({
      type: BIO_SET,
      payload: val
    });
  }
};


export const refreshUserProfile = () => {
  return (dispatch, getState) => {

    const {user} = getState();

    if (user.username) {
      blockstack.lookupProfile(user.username).then(profile => {
        if (profile) {
          dispatch(profileLoaded(profile));
        }
      });
    }
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

export const draftSave = () => ({
  type: DRAFT_SAVE
});

export const draftSaved = (newData) => ({
  type: DRAFT_SAVED,
  payload: {
    newData
  }
});

export const draftNotSaved = () => ({
  type: DRAFT_SAVE_ERR
});