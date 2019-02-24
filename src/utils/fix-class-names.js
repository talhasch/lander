export default  (s) => {
  return s.split(' ').map(x => x.trim()).join(' ').trim();
};