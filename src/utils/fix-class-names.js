export default  (s) => {
  return s.split(' ').map(x => x.trim()).filter(x => x).join(' ').trim();
};