import {UserSession, AppConfig} from 'blockstack';
import { configure } from 'radiks';

const domain = window.location.origin;

export const userSession = new UserSession({
  appConfig: new AppConfig(['store_write', 'publish_data'], domain, '/app/auth', '/manifest.json')
});

configure({
  apiServer: 'https://radiks.landr.me',
  userSession
});