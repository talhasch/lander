import {
  bitcoinSvg,
  ethereumSvg,
  facebookSvg,
  githubSvg,
  instagramSvg,
  linkedInSvg,
  twitterSvg
} from "./svg";

export const draftFile = 'lander.draft.file.db.json';
export const publishedFile = 'lander.public.file.db.json';
export const flagFile = 'lander.flag.file.db.json';

export const defaultBgImage = 'wave.jpg';


export const walletAccountTypes = [
  {id: 'bitcoin', name: 'Bitcoin', 'icon': bitcoinSvg},
  {id: 'ethereum', name: 'Ethereum', 'icon': ethereumSvg}
];


export const socialAccountTypes = [
  {id: 'github', name: 'Github', 'icon': githubSvg},
  {id: 'twitter', name: 'Twitter', 'icon': twitterSvg},
  {id: 'facebook', name: 'Facebook', 'icon': facebookSvg},
  {id: 'instagram', name: 'Instagram', 'icon': instagramSvg},
  {id: 'linkedIn', name: 'LinkedIn', 'icon': linkedInSvg}
];

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
      linkedIn: ''
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
    updated: '010101'
  }
);


export const aliasRe = /^[a-zA-Z0-9]{4,10}$/;