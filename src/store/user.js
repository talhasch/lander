import md5 from 'blueimp-md5';

import {
  TOGGLE_PHOTO_UPLOAD,
  TOGGLE_NAME_EDIT,
  TOGGLE_DESCRIPTION_EDIT,
  TOGGLE_BIO_EDIT,
  TOGGLE_ACCOUNT_EDIT,
  TOGGLE_WALLET_EDIT,
  TOGGLE_STYLE
} from './ui';

import {draftFile, publishedFile, defaultBgImage} from '../constants';

import * as blockStack from 'blockstack';

export const USER_LOGIN = '@user/LOGIN';
export const USER_LOGOUT = '@user/LOGOUT';

export const DATA_LOADED = '@user/DATA_LOADED';
export const PROFILE_LOADED = '@user/PROFILE_LOADED';

export const BG_IMAGE_SET = '@user/BG_IMAGE_SET';
export const BG_COLOR_SET = '@user/BG_COLOR_SET';
export const BG_BLUR_SET = '@user/BG_BLUR_SET';
export const BIO_SET = '@user/BIO_SAVE';

export const PHOTO_SET = '@user/PHOTO_SET';
export const NAME_SET = '@user/NAME_SET';
export const DESCRIPTION_SET = '@user/DESCRIPTION_SET';

export const DRAFT_SAVE = '@user/DRAFT_SAVE';
export const DRAFT_SAVED = '@user/DRAFT_SAVED';
export const DRAFT_SAVE_ERR = '@user/DRAFT_SAVE_ERR';

export const PUBLISH_SAVE = '@user/PUBLISH_SAVE';
export const PUBLISH_SAVED = '@user/PUBLISH_SAVED';
export const PUBLISH_SAVE_ERR = '@user/PUBLISH_SAVE_ERR';

export const dataModel = () => (
  {
    name: '',
    description: '',
    bio: '',
    photo: '',
    email: '',
    video: '',
    accounts: {
      twitter: '',
      facebook: '',
      github: '',
      instagram: '',
      linkedIn: ''
    },
    wallets: {
      bitcoin: '',
      ethereum: ''
    },
    bg: {
      image: defaultBgImage,
      color: '#4a96f7',
      blur: '2'
    },
    updated: '010101'
  }
);

export const prepareDraftForSave = (draft, update = false) => {
  const {bgTemp, bioTemp, photoTemp, nameTemp, descriptionTemp, ...draftData} = draft;

  if (update) {
    draftData.updated = md5(JSON.stringify(draftData));
  }

  return draftData;
};


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
    case TOGGLE_PHOTO_UPLOAD: {
      const {draft} = state;
      let newDraft;
      if (draft.photoTemp !== undefined) {
        const {photoTemp} = draft;
        const {photoTemp: delTemp, ...draft1} = draft;
        newDraft = Object.assign({}, draft1, {photo: photoTemp});
      } else {
        const {photo} = draft;
        newDraft = Object.assign({}, draft, {photoTemp: photo});
      }
      return Object.assign({}, state, {draft: newDraft});
    }
    case TOGGLE_NAME_EDIT: {
      const {draft} = state;
      let newDraft;
      if (draft.nameTemp !== undefined) {
        const {nameTemp} = draft;
        const {nameTemp: delTemp, ...draft1} = draft;
        newDraft = Object.assign({}, draft1, {name: nameTemp});
      } else {
        const {name} = draft;
        newDraft = Object.assign({}, draft, {nameTemp: name});
      }
      return Object.assign({}, state, {draft: newDraft});
    }
    case TOGGLE_DESCRIPTION_EDIT: {
      const {draft} = state;
      let newDraft;
      if (draft.descriptionTemp !== undefined) {
        const {descriptionTemp} = draft;
        const {descriptionTemp: delTemp, ...draft1} = draft;
        newDraft = Object.assign({}, draft1, {description: descriptionTemp});
      } else {
        const {description} = draft;
        newDraft = Object.assign({}, draft, {descriptionTemp: description});
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
    case TOGGLE_ACCOUNT_EDIT: {
      const {draft} = state;
      let newDraft;
      if (draft.accountsTemp) {
        const {accountsTemp} = draft;
        const {accountsTemp: delTemp, ...draft1} = draft;
        newDraft = Object.assign({}, draft1, {accounts: accountsTemp});
      } else {
        const {accounts} = draft;
        newDraft = Object.assign({}, draft, {accountsTemp: accounts});
      }
      return Object.assign({}, state, {draft: newDraft});
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
    case PHOTO_SET: {
      const {draft} = state;
      const newDraft = Object.assign({}, draft, {photo: action.payload});
      return Object.assign({}, state, {draft: newDraft});
    }
    case NAME_SET: {
      const {draft} = state;
      const newDraft = Object.assign({}, draft, {name: action.payload});
      return Object.assign({}, state, {draft: newDraft});
    }
    case DESCRIPTION_SET: {
      const {draft} = state;
      const newDraft = Object.assign({}, draft, {description: action.payload});
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
        if (!newVal) {
          newVal = defaultBgImage;
        }
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

    dispatch(loginAct(username));
    dispatch(loadProfileAct(profile));

    let draft;
    try {
      const file = await blockStack.getFile(draftFile);
      draft = JSON.parse(file);
    } catch (e) {
      console.error(`File get error. ${e}`);
      draft = null;
    }

    if (draft === null) {
      const obj = dataModel();
      try {
        await blockStack.putFile(draftFile, JSON.stringify(obj), {encrypt: true});
        draft = Object.assign({}, obj);
      } catch (e) {
        console.error(`File put error. ${e}`);
      }
    }

    let published;
    try {
      const file = await blockStack.getFile(publishedFile, {decrypt: false});
      published = JSON.parse(file);
    } catch (e) {
      console.error(`File get error. ${e}`);
      published = null;
    }

    dispatch(loadDataAct(draft, published));
  }
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutAct());
    blockStack.signUserOut();
  }
};

export const setPhoto = (val) => {
  return (dispatch) => {
    dispatch(setPhotoAct(val));
  }
};

export const setName = (val) => {
  return (dispatch) => {
    dispatch(setNameAct(val));
  }
};

export const setDescription = (val) => {
  return (dispatch) => {
    dispatch(setDescriptionAct(val));
  }
};

export const setBgBlur = (val) => {
  return (dispatch) => {
    dispatch(setBgBlurAct(val));
  }
};

export const setBgImage = (val) => {
  return (dispatch) => {
    dispatch(setBgImageAct(val));
  }
};

export const setBgColor = (val) => {
  return (dispatch) => {
    dispatch(setBgColorAct(val));
  }
};

export const setBio = (val) => {
  return (dispatch) => {
    dispatch(setBioAct(val));
  }
};

export const saveDraft = () => {
  return (dispatch, getState) => {

    dispatch(saveDraftAct());

    const {user} = getState();
    const draftData1 = prepareDraftForSave(user.draft, true);

    return blockStack.putFile(draftFile, JSON.stringify(draftData1), {encrypt: true}).then(() => {
      return draftData1;
    })
  }
};

export const saveDraftDone = (newData) => {
  return (dispatch) => {

    dispatch(saveDraftDoneAct(newData));
  }
};

export const saveDraftError = () => {
  return (dispatch) => {

    dispatch(saveDraftErrorAct());
  }
};

export const publish = () => {
  return (dispatch, getState) => {

    dispatch(publishAct());

    const {user} = getState();
    const publicData = prepareDraftForSave(user.draft, false);

    return blockStack.putFile(publishedFile, JSON.stringify(publicData), {encrypt: false}).then(() => {
      return publicData;
    });
  }
};

export const publishDone = (newData) => {
  return (dispatch) => {

    dispatch(publishDoneAct(newData));
  }
};

export const publishError = () => {
  return (dispatch) => {

    dispatch(publishErrorAct());
  }
};


export const loadProfile = () => {
  return (dispatch, getState) => {

    const {user} = getState();

    if (user.username) {
      blockStack.lookupProfile(user.username).then(profile => {
        if (profile) {
          dispatch(loadProfileAct(profile));
        }
      });
    }
  }
};

/* Action creators */

export const loginAct = (username) => ({
  type: USER_LOGIN,
  payload: username
});

export const logoutAct = () => ({
  type: USER_LOGOUT
});

export const loadDataAct = (draft, published) => ({
  type: DATA_LOADED,
  payload: {
    draft,
    published
  }
});

export const setPhotoAct = (val) => ({
  type: PHOTO_SET,
  payload: val
});

export const setNameAct = (val) => ({
  type: NAME_SET,
  payload: val
});

export const setDescriptionAct = (val) => ({
  type: DESCRIPTION_SET,
  payload: val
});

export const setBgBlurAct = (val) => ({
  type: BG_BLUR_SET,
  payload: val
});

export const setBgImageAct = (val) => ({
  type: BG_IMAGE_SET,
  payload: val
});

export const setBgColorAct = (val) => ({
  type: BG_COLOR_SET,
  payload: val
});

export const setBioAct = (val) => ({
  type: BIO_SET,
  payload: val
});

export const loadProfileAct = (profile) => ({
  type: PROFILE_LOADED,
  payload: profile
});

export const saveDraftAct = () => ({
  type: DRAFT_SAVE
});

export const saveDraftDoneAct = (newData) => ({
  type: DRAFT_SAVED,
  payload: {
    newData
  }
});

export const saveDraftErrorAct = () => ({
  type: DRAFT_SAVE_ERR
});

export const publishAct = () => ({
  type: PUBLISH_SAVE
});

export const publishDoneAct = (newData) => ({
  type: PUBLISH_SAVED,
  payload: {
    newData
  }
});

export const publishErrorAct = () => ({
  type: PUBLISH_SAVE_ERR
});