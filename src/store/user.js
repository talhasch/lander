import {TOGGLE_STYLE, TOGGLE_BIO_EDIT} from './ui';

import {draftFile, releaseFile} from '../constants';

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
        draft: null,
        publicData: null,
        loaded: false,
        draftSaving: false,
        publicSaving: false
      };
    case PROFILE_LOADED: {
      return Object.assign({}, state, {profile: action.payload});
    }
    case DATA_LOADED: {
      const {draft, release} = action.payload;

      return Object.assign({}, state, {draft, release, loaded: true});
    }
    case TOGGLE_STYLE: {
      const {draft} = state;
      let newDraft;
      if (draft.bgTemp) {
        const {bgTemp} = draft;
        const {bgTemp: delTemp, ...draft1} = draft;
        newDraft = Object.assign({}, draft1, {bg: bgTemp});
      } else {
        const {bg} = draft;
        newDraft = Object.assign({}, draft, {bgTemp: bg});
      }
      return Object.assign({}, state, {draft: newDraft});
    }
    case TOGGLE_BIO_EDIT: {
      const {draft} = state;
      let newDraft;
      if (draft.bioTemp !== undefined) {
        const {bioTemp} = draft;
        const {bioTemp: delTemp, ...draft1} = draft;
        newDraft = Object.assign({}, draft1, {bio: bioTemp});
      } else {
        const {bio} = draft;
        newDraft = Object.assign({}, draft, {bioTemp: bio});
      }
      return Object.assign({}, state, {draft: newDraft});
    }
    case BG_BLUR_SET: {
      const {draft} = state;
      const {bg} = draft;
      const newDraft = Object.assign({}, draft, {bg: Object.assign({}, bg, {blur: action.payload})});
      return Object.assign({}, state, {draft: newDraft});
    }
    case BG_IMAGE_SET: {

      const {draft} = state;
      const {bg} = draft;

      let newVal = action.payload;
      if (action.payload === 'recover') {
        const {bgTemp} = draft;
        ({image: newVal} = bgTemp);
      }

      const newDraft = Object.assign({}, draft, {bg: Object.assign({}, bg, {image: newVal})});
      return Object.assign({}, state, {draft: newDraft});
    }
    case BG_COLOR_SET: {
      const {draft} = state;
      const {bg} = draft;
      const newDraft = Object.assign({}, draft, {bg: Object.assign({}, bg, {color: action.payload})});
      return Object.assign({}, state, {draft: newDraft});
    }
    case BIO_SET: {
      const {draft} = state;
      const newDraft = Object.assign({}, draft, {bio: action.payload});
      return Object.assign({}, state, {draft: newDraft});
    }
    case DRAFT_SAVE: {
      return Object.assign({}, state, {draftSaving: true});
    }
    case DRAFT_SAVED: {
      const {newData} = action.payload;

      return Object.assign({}, state, {draft: newData, draftSaving: false});
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

    let draft;
    try {
      const file = await blockstack.getFile(draftFile);
      draft = JSON.parse(file);
    } catch (e) {
      console.error(`File get error. ${e}`);
      draft = null;
    }

    if (draft === null) {
      const obj = dataModel();
      try {
        await blockstack.putFile(draftFile, JSON.stringify(obj), {encrypt: true});
        draft = Object.assign({}, obj);
      } catch (e) {
        console.error(`File put error. ${e}`);
      }
    }

    let release;
    try {
      release = await blockstack.getFile(releaseFile);
    } catch (e) {
      console.error(`File get error. ${e}`);
      release = null;
    }

    dispatch(dataLoaded(draft, release));
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
    const {bgTemp, bioTemp, ...draftData1} = user.draft;
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

export const dataLoaded = (draft, publicData) => ({
  type: DATA_LOADED,
  payload: {
    draft,
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