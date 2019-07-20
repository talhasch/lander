import {UserSession, AppConfig} from 'blockstack';
import {configure} from 'radiks';
import {decodeToken} from 'jsontokens'

const domain = window.location.origin;

export const userSession = new UserSession({
  appConfig: new AppConfig(['store_write', 'publish_data'], domain, '/app/auth', '/manifest.json')
});

configure({
  apiServer: 'https://radiks.landr.me',
  userSession
});


export const decodeUserResponseToken = () => {
  const {authResponseToken} = userSession.loadUserData();
  return decodeToken(authResponseToken);
};

export const getUsername = () => {
  const {username} = decodeUserResponseToken().payload;
  return username;
};