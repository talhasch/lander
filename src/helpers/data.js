export const id = () => '_' + Math.random().toString(36).substr(2, 9);

export const account = (service, identifier) => {
  return {
    id: id(),
    service,
    identifier
  }
};

export const createProfile = (rootValues, socialAccounts = [], walletAccounts = []) => {
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

  return Object.assign({}, def, rootValues);
};