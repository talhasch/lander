import stringify from "./stringify.js";

it('should stringify', () => {
  expect(stringify({a: "b", c: "d"})).toBe('{"a":"b","c":"d"}');
});
