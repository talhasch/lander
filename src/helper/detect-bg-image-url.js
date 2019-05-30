export default (image) => {
  if (image.indexOf('https://') === 0) {
    return image;
  }

  return image ? /^data:/.test(image) ? image : require(`../data/bg-images/${image}`) : '';
};