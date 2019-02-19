import md5 from 'blueimp-md5';

export const id = () => '_' + Math.random().toString(36).substr(2, 9);

export const accountModel = (service, identifier, identifier2 = null) => {
  return {
    id: id(),
    service,
    identifier,
    identifier2
  }
};

export const profileModel = (rootProps, socialAccounts = [], walletAccounts = []) => {
  const def = {
    name: '',
    description: '',
    bio: '',
    email: '',
    photo: '',
    social: socialAccounts,
    wallet: walletAccounts,
    bg: {
      image: 'wave.jpg',
      color: '#4a96f7',
      blur: 2
    }
  };

  return Object.assign({}, def, rootProps);
};

export const putPrivateFile = (obj) => {
  const hash = md5(JSON.stringify(obj));
  const newObj = Object.assign({}, obj, {hash});

  localStorage.setItem('lander-private-profile', JSON.stringify(newObj));

  return newObj;
};

export const getPrivateFile = () => {
  const val = localStorage.getItem('lander-private-profile');

  if (val) {
    return JSON.parse(val);
  }

  return null;
};

export const putPublicFile = (obj) => {
  return window.blockstack.putFile(
    'lander-public-profile.json',
    JSON.stringify(obj),
    {
      encrypt: false,
      contentType: 'application/json'
    }
  )
};