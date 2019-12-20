import {
  bitcoinSvg,
  ethereumSvg,
  facebookSvg,
  githubSvg,
  instagramSvg,
  linkedInSvg,
  twitterSvg,
  youtubeSvg,
  steemSvg
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
  {id: 'github', name: 'Github', 'icon': githubSvg, label: 'github.com/', placeholder: 'username'},
  {id: 'twitter', name: 'Twitter', 'icon': twitterSvg, label: 'twitter.com/', placeholder: 'username'},
  {id: 'facebook', name: 'Facebook', 'icon': facebookSvg, label: 'facebook.com/', placeholder: 'username'},
  {id: 'instagram', name: 'Instagram', 'icon': instagramSvg, label: 'instagram.com/', placeholder: 'username'},
  {id: 'linkedIn', name: 'LinkedIn', 'icon': linkedInSvg, label: 'linkedin.com/in/', placeholder: 'username'},
  {id: 'youtube', name: 'Youtube', 'icon': youtubeSvg, label: 'youtube.com/', placeholder: 'channel address'},
  {id: 'steem', name: 'Steem', 'icon': steemSvg, label: 'steemit.com/', placeholder: 'username'}
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
    updated: '010101'
  }
);


export const aliasRe = /^[a-zA-Z0-9]{4,10}$/;
