import {
  bitcoinSvg,
  ethereumSvg,
  facebookSvg,
  githubSvg,
  instagramSvg,
  linkedInSvg,
  twitterSvg
} from "./svg";

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


export const draftFile = 'lander.draft.file.db.json';
export const publishedFile = 'lander.public.file.db.json';
export const flagFile = 'lander.flag.file.db.json';

export const defaultBgImage = 'wave.jpg';