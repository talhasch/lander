import {userSession} from './blockstack-config';
import {User} from 'radiks-patch';

import {draftFile, publishedFile, flagFile} from './constants';

export const getDraftFile = () => {
  return userSession.getFile(draftFile);
};

export const putDraftFile = (data) => {
  return userSession.putFile(draftFile, JSON.stringify(data), {encrypt: true});
};

export const getPublishedFile = () => {
  return userSession.getFile(publishedFile, {decrypt: false});
};

export const putPublishedFile = (data) => {
  return userSession.putFile(publishedFile, JSON.stringify(data), {encrypt: false}).then(x => {
    const curr = User.currentUser();
    return curr.save().then(() => x);
  })
};

export const getFlagFile = () => {
  return userSession.getFile(flagFile);
};

export const putFlagFile = (data) => {
  return userSession.putFile(flagFile, JSON.stringify(data), {encrypt: true});
};

export const getFlagLocal = (username) => {
  return localStorage.getItem(`flag1-${username}`);
};

export const setFlagLocal = (username, val) => {
  localStorage.setItem(`flag1-${username}`, val);
};

export const deleteFlagLocal = (username) => {
  localStorage.removeItem(`flag1-${username}`);
};
