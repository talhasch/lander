import validateEmail from "./validate-email";

it('should return true', () => {
  expect(validateEmail("talhabugrabulut@gmail.com")).toBe(true);
});


it('should return false', () => {
  expect(validateEmail("lorem")).toBe(false);
});

it('should return false', () => {
  expect(validateEmail("lorem@ipsum")).toBe(false);
});

it('should return false', () => {
  expect(validateEmail("lorem@ipsum.")).toBe(false);
});


it('should return false', () => {
  expect(validateEmail("")).toBe(false);
});
