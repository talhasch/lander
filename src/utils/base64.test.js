import {b64EncodeUnicode, b64DecodeUnicode} from "./base64.js";

it('1- ascii', () => {
  const input = b64EncodeUnicode('lorem ipsum dolor sit amet');
  expect(input).toBe('bG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQ=');

  const result = b64DecodeUnicode(input);
  expect(result).toBe('lorem ipsum dolor sit amet');
});


it('2- unicode', () => {
  const input = b64EncodeUnicode('kırmızı TİLKİ dağda GEZİYOR 🎉');
  expect(input).toBe('a8Sxcm3EsXrEsSBUxLBMS8SwIGRhxJ9kYSBHRVrEsFlPUiDwn46J');

  const result = b64DecodeUnicode(input);
  expect(result).toBe('kırmızı TİLKİ dağda GEZİYOR 🎉');
});

it('3- unicode', () => {
  const input = b64EncodeUnicode('こんにちは 👋  很高兴见到你');
  expect(input).toBe('44GT44KT44Gr44Gh44GvIPCfkYsgIOW+iOmrmOWFtOingeWIsOS9oA==');

  const result = b64DecodeUnicode(input);
  expect(result).toBe('こんにちは 👋  很高兴见到你');
});
