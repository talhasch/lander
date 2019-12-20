export default (network, address) => {
  switch (network) {
    case 'github':
      return `https://github.com/${address}`;
    case 'twitter':
      return `https://twitter.com/${address}`;
    case 'facebook':
      return `https://facebook.com/${address}`;
    case 'instagram':
      return `https://instagram.com/${address}`;
    case 'linkedIn':
      return `https://linkedin.com/in/${address}`;
    case 'youtube':
      return `https://youtube.com/${address}`;
    case 'steem':
      return `https://steemit.com/@${address}`;
    default:
      return '';
  }
};
