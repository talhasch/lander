import {userSession} from '../blockstack-config';
import {accountTypes as walletAccountTypes} from "../wallet";
import {accountTypes as socialAccountTypes} from '../social';

export const extractAccounts = (type = 'social') => {
  const acs = {};

  switch (type) {
    case 'social':
      socialAccountTypes.forEach((x) => {
        acs[x.id] = '';
      });
      break;
    case 'wallet':
      walletAccountTypes.forEach((x) => {
        acs[x.id] = '';
      });
      break;
    default:
  }


  const {profile} = userSession.loadUserData();

  if (!profile.account) {
    return acs;
  }

  profile.account.forEach((x) => {
    if (acs[x.service] !== undefined) {
      acs[x.service] = x.identifier;
    }
  });

  return acs;
};

