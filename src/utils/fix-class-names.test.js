import fixClassNames from "./fix-class-names.js";

it('should fix', () => {
  expect(fixClassNames('lorem ipsum dolor sit  amet foo      bar baz')).toBe('lorem ipsum dolor sit amet foo bar baz');
});
