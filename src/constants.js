import {
  bitcoinSvg,
  ethereumSvg,
  facebookSvg,
  githubSvg,
  hackerNewsSvg,
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
  {id: 'linkedIn', name: 'LinkedIn', 'icon': linkedInSvg},
  {id: 'hackerNews', name: 'Hacker News', 'icon': hackerNewsSvg}
];


export const draftFile = 'lander_draft_file';
export const publishedFile = 'lander_public_file';