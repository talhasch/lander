import socialAccountLink from "./social-account-link";

it('github', () => {
  expect(socialAccountLink('github', 'talhasch')).toBe('https://github.com/talhasch');
});

it('twitter', () => {
  expect(socialAccountLink('twitter', 'talhasch')).toBe('https://twitter.com/talhasch');
});

it('facebook', () => {
  expect(socialAccountLink('facebook', 'talhasch')).toBe('https://facebook.com/talhasch');
});

it('facebook', () => {
  expect(socialAccountLink('instagram', 'talhasch')).toBe('https://instagram.com/talhasch');
});

it('linked in', () => {
  expect(socialAccountLink('linkedIn', 'talhasch')).toBe('https://linkedin.com/in/talhasch');
});