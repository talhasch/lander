export const id = () => '_' + Math.random().toString(36).substr(2, 9);

export const makeAccount = (service, identifier, identifier2 = null) => {
  return {
    id: id(),
    service,
    identifier,
    identifier2
  }
};

export const createProfile = (rootProps, socialAccounts = [], walletAccounts = []) => {
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