import validate from "./validate-url";

it('should return true', () => {
  expect(validate("https://myssite.com")).toBe(true);
});

it('should return false', () => {
  expect(validate("myssite.com")).toBe(false);
});

it('should return false', () => {
  expect(validate("https://")).toBe(false);
});

