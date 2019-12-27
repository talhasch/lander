export const draftFile = 'lander.draft.file.db.json';
export const publishedFile = 'lander.public.file.db.json';
export const flagFile = 'lander.flag.file.db.json';

export const defaultBgImage = 'wave.jpg';

export const dataModel = () => (
  {
    name: '',
    description: '',
    bio: '',
    photo: '',
    email: '',
    video: '',
    accounts: {
      twitter: '',
      facebook: '',
      github: '',
      instagram: '',
      linkedIn: '',
      youtube: ''
    },
    wallets: {
      bitcoin: '',
      ethereum: ''
    },
    bg: {
      image: defaultBgImage,
      color: '#4a96f7',
      blur: '2'
    },
    contact: {
      email: '',
      phone: '',
      address: '',
      website: ''
    },
    updated: '010101'
  }
);


export const aliasRe = /^[a-zA-Z0-9]{4,10}$/;
