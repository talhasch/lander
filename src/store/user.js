import {TOGGLE_STYLE, TOGGLE_BIO_EDIT} from './ui';

import {draftFile, publishedFile} from '../constants';

const blockstack = require('blockstack');

export const USER_LOGIN = '@user/LOGIN';
export const USER_LOGOUT = '@user/LOGOUT';

export const DATA_LOADED = '@user/DATA_LOADED';
export const PROFILE_LOADED = '@user/PROFILE_LOADED';

export const BG_IMAGE_SET = '@user/BG_IMAGE_SET';
export const BG_COLOR_SET = '@user/BG_COLOR_SET';
export const BG_BLUR_SET = '@user/BG_BLUR_SET';

export const BIO_SET = '@user/BIO_SAVE';

export const DRAFT_SAVE = '@user/DRAFT_SAVE';
export const DRAFT_SAVED = '@user/DRAFT_SAVED';
export const DRAFT_SAVE_ERR = '@user/DRAFT_SAVE_ERR';


export const PUBLISH_SAVE = '@user/PUBLISH_SAVE';
export const PUBLISH_SAVED = '@user/PUBLISH_SAVED';
export const PUBLISH_SAVE_ERR = '@user/PUBLISH_SAVE_ERR';


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
        published: null,
        loaded: false,
        saving: false,
        publishing: false
      };
    case PROFILE_LOADED: {
      return Object.assign({}, state, {profile: action.payload});
    }
    case DATA_LOADED: {
      const {draft, published} = action.payload;

      return Object.assign({}, state, {draft, published, loaded: true});
    }
    case TOGGLE_STYLE: {
      if (!action.payload.effect) {
        return state;
      }

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
      if (!action.payload.effect) {
        return state;
      }

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
      return Object.assign({}, state, {saving: true});
    }
    case DRAFT_SAVED: {
      let {newData} = action.payload;
      const {bg} = newData;
      newData = Object.assign({}, newData, {bgTemp: bg});
      return Object.assign({}, state, {draft: newData, saving: false});
    }
    case DRAFT_SAVE_ERR: {
      return Object.assign({}, state, {saving: false});
    }
    case PUBLISH_SAVE: {
      return Object.assign({}, state, {publishing: true});
    }
    case PUBLISH_SAVED: {
      let {newData} = action.payload;
      return Object.assign({}, state, {published: newData, publishing: false});
    }
    case PUBLISH_SAVE_ERR: {
      return Object.assign({}, state, {publishing: false});
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

    let published;
    try {
      const file = await blockstack.getFile(publishedFile, {decrypt: false});
      published = JSON.parse(file);
    } catch (e) {
      console.error(`File get error. ${e}`);
      published = null;
    }

    dispatch(dataLoaded(draft, published));
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
    dispatch(bgBlurSet(val));
  }
};

export const setBgImage = (val) => {
  return (dispatch) => {
    dispatch(bgImageSet(val));
  }
};

export const setBgColor = (val) => {
  return (dispatch) => {
    dispatch(bgColorSet(val));
  }
};

export const setBio = (val) => {
  return (dispatch) => {
    dispatch(bioSet(val));
  }
};

export const saveDraft = () => {
  return (dispatch, getState) => {

    dispatch(draftSave());

    const {user} = getState();
    const {bgTemp, bioTemp, ...draftData1} = user.draft;
    draftData1.updated = Date.now();

    return blockstack.putFile(draftFile, JSON.stringify(draftData1), {encrypt: true}).then((resp) => {
      dispatch(draftSaved(draftData1));
      return resp
    }).catch((err) => {
      dispatch(draftNotSaved());
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
  }
};


export const publish = () => {
  return (dispatch, getState) => {

    dispatch(publishSave());

    const {user} = getState();
    const {bgTemp, bioTemp, ...publicData} = user.draft;

    return blockstack.putFile(publishedFile, JSON.stringify(publicData), {encrypt: false}).then((resp) => {
      dispatch(publishSaved(publicData));
      return resp
    }).catch((err) => {
      dispatch(publishNotSaved());
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
  }
};

export const refreshProfile = () => {
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

export const loggedOut = () => ({
  type: USER_LOGOUT
});

export const dataLoaded = (draft, published) => ({
  type: DATA_LOADED,
  payload: {
    draft,
    published
  }
});

export const bgBlurSet = (val) => ({
  type: BG_BLUR_SET,
  payload: val
});

export const bgImageSet = (val) => ({
  type: BG_IMAGE_SET,
  payload: val
});

export const bgColorSet = (val) => ({
  type: BG_COLOR_SET,
  payload: val
});

export const bioSet = (val) => ({
  type: BIO_SET,
  payload: val
});

export const profileLoaded = (profile) => ({
  type: PROFILE_LOADED,
  payload: profile
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

export const publishSave = () => ({
  type: PUBLISH_SAVE
});

export const publishSaved = (newData) => ({
  type: PUBLISH_SAVED,
  payload: {
    newData
  }
});

export const publishNotSaved = () => ({
  type: DRAFT_SAVE_ERR
});