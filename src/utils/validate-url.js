export default (s) => {
  try {
    new URL(s);
    return true;
  } catch (e) {
    return false
  }
}
