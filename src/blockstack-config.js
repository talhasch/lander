import {UserSession, AppConfig} from 'blockstack';
import {getPublicKeyFromPrivate} from 'blockstack/lib/keys';
import {configure} from 'radiks-patch';
import {decodeToken} from 'jsontokens'

const RADIKS_URL = `https://${window.location.protocol === 'http:' ? 'radiks-dev.landr.me' : 'radiks.landr.me'}`;

const domain = window.location.origin;

export const userSession = new UserSession({
  appConfig: new AppConfig(['store_write', 'publish_data'], domain, '/app/auth', '/manifest.json')
});

configure({
  apiServer: RADIKS_URL,
  userSession
});

export const decodeUserResponseToken = () => {
  const {authResponseToken} = userSession.loadUserData();
  return decodeToken(authResponseToken);
};

export const getUsername = () => {
  const {username} = decodeUserResponseToken().payload;
  if (username) {
    return username;
  }

  const chars = getUserPublicKey().split('');
  const userRnd = [1, 3, 11, 13, 21, 23, 31, 33].map(x => chars[x]).join('');
  return `p-${userRnd}`;
};

export const getUserPublicKey = () => {
  const {appPrivateKey} = userSession.loadUserData();

  return getPublicKeyFromPrivate(appPrivateKey);
};

export const getUserAppBucketUrl = () => {
  const {profile} = userSession.loadUserData();

  if (profile.hasOwnProperty('apps') && profile.apps.hasOwnProperty(domain)) {
    return profile.apps[domain];
  }

  return null;
};


