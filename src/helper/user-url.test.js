import makeUserUrl from "./user-url.js";

it('should make user url', () => {
  expect(makeUserUrl('username')).toBe('http://localhost/username');
});
