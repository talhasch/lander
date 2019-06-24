import bioRenderer from "./bio-renderer.js";

it('empty string', () => {
  const input = '';
  const expected = '';

  expect(bioRenderer(input)).toBe(expected);
});

it('html test ', () => {
  const input = "<i>lorem</i> ipsum \n <strong>dolor</strong> sit amet";
  const expected = '<p><i>lorem</i> ipsum<br />\n<strong>dolor</strong> sit amet</p>';

  expect(bioRenderer(input)).toBe(expected);
});


it('markdown test', () => {
  const input = "*lorem* ipsum **dolor** sit [amet](https://sitamet.com)";
  const expected = "<p><em>lorem</em> ipsum <strong>dolor</strong> sit <a href=\"https://sitamet.com\">amet</a></p>";

  expect(bioRenderer(input)).toBe(expected);
});


it('sanitizr test', () => {
  const input = "<script>var a=1</script><img onload='alert(\"hacked\")' /><span onclick='alert(\"hacked\")'>click here</span> <a href='http://google.com'>and here</a>";
  const expected = "click here <a>and here</a>";

  expect(bioRenderer(input)).toBe(expected);
});