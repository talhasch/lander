import * as blockStack from 'blockstack';

import {draftFile, publishedFile, flagFile} from './constants';

export const getDraftFile = () => {
  return blockStack.getFile(draftFile);
};

export const putDraftFile = (data) => {
  return blockStack.putFile(draftFile, JSON.stringify(data), {encrypt: true});
};

export const getPublishedFile = () => {
  return blockStack.getFile(publishedFile, {decrypt: false});
};

export const putPublishedFile = (data) => {
  return blockStack.putFile(publishedFile, JSON.stringify(data), {encrypt: false})
};

export const getFlagFile = () => {
  return blockStack.getFile(flagFile);
};

export const putFlagFile = (data) => {
  return blockStack.putFile(flagFile, JSON.stringify(data), {encrypt: true});
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