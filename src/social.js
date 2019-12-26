import {facebookSvg, githubSvg, instagramSvg, linkedInSvg, steemSvg, twitterSvg, youtubeSvg} from './svg';

export const accountTypes = [
  {id: 'github', name: 'Github', 'icon': githubSvg, label: 'github.com/', placeholder: 'username'},
  {id: 'twitter', name: 'Twitter', 'icon': twitterSvg, label: 'twitter.com/', placeholder: 'username'},
  {id: 'facebook', name: 'Facebook', 'icon': facebookSvg, label: 'facebook.com/', placeholder: 'username'},
  {id: 'instagram', name: 'Instagram', 'icon': instagramSvg, label: 'instagram.com/', placeholder: 'username'},
  {id: 'linkedIn', name: 'LinkedIn', 'icon': linkedInSvg, label: 'linkedin.com/in/', placeholder: 'username'},
  {id: 'youtube', name: 'Youtube', 'icon': youtubeSvg, label: 'youtube.com/', placeholder: 'channel address'},
  {id: 'steem', name: 'Steem', 'icon': steemSvg, label: 'steemit.com/', placeholder: 'username'}
];
