import detectBgImageUrl from "./detect-bg-image-url.js";

it('should detect image url', () => {
  expect(detectBgImageUrl('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ')).toBe('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ');
});


it('should detect image url', () => {
  expect(detectBgImageUrl('wave.jpg')).toBe('wave.jpg')
});


it('should detect image url', () => {
  expect(detectBgImageUrl('https://www.foo.com/wave.jpg')).toBe('https://www.foo.com/wave.jpg')
});
