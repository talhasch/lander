import {accountLink} from "./social";

it('github', () => {
  expect(accountLink('github', 'talhasch')).toBe('https://github.com/talhasch');
});

it('twitter', () => {
  expect(accountLink('twitter', 'talhasch')).toBe('https://twitter.com/talhasch');
});

it('facebook', () => {
  expect(accountLink('facebook', 'talhasch')).toBe('https://facebook.com/talhasch');
});

it('facebook', () => {
  expect(accountLink('instagram', 'talhasch')).toBe('https://instagram.com/talhasch');
});

it('linked in', () => {
  expect(accountLink('linkedIn', 'talhasch')).toBe('https://linkedin.com/in/talhasch');
});

it('youtube', () => {
  expect(accountLink('youtube', 'talhasch')).toBe('https://youtube.com/talhasch');
});

it('steem', () => {
  expect(accountLink('steem', 'talhasch')).toBe('https://steemit.com/@talhasch');
});

it('medium', () => {
  expect(accountLink('medium', 'talhasch')).toBe('https://medium.com/@talhasch');
});
