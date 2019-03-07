import socialAccountLink from "./social-account-link";

it('github', () => {
  expect(socialAccountLink({service: 'github', identifier: 'talhasch'})).toBe('https://github.com/talhasch');
});

it('twitter', () => {
  expect(socialAccountLink({service: 'twitter', identifier: 'talhasch'})).toBe('https://twitter.com/talhasch');
});

it('facebook', () => {
  expect(socialAccountLink({service: 'facebook', identifier: 'talhasch'})).toBe('https://facebook.com/talhasch');
});

it('facebook', () => {
  expect(socialAccountLink({service: 'instagram', identifier: 'talhasch'})).toBe('https://instagram.com/talhasch');
});

it('linked in', () => {
  expect(socialAccountLink({service: 'linkedIn', identifier: 'talhasch'})).toBe('https://linkedin.com/in/talhasch');
});

it('hackerNews', () => {
  expect(socialAccountLink({
    service: 'hackerNews',
    identifier: 'talhasch'
  })).toBe('https://news.ycombinator.com/user?id=talhasch');
});


