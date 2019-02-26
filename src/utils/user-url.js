import getBaseUrl from './get-base-url';

export default (username) => `${getBaseUrl()}/${username}`;