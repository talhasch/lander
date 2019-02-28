import flattenMessages from "./flatten-messages";

it('should flatten messages', () => {

  const input = {
    "g": {
      "foo": "foo",
      "bar": "bar",
      "baz": {
        "lorem": "ipsum"
      }
    }
  };

  expect(flattenMessages(input)).toMatchSnapshot()
});
