export default (image) => {
  return image ? /^data:/.test(image) ? image : require(`../data/bg-images/${image}`) : '';
};