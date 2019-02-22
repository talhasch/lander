export const detectBgImageUrl = (image) => {
  return image ? /^https?:\/\//.test(image) ? image : require(`./data/bg-images/${image}`) : '';
};