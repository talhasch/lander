import getBaseUrl from "./get-base-url";

it('should return base url', () => {
  expect(getBaseUrl()).toBe('http://localhost');
});
