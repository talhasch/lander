export default (ac) => {
  switch (ac.service) {
    case 'github':
      return `https://github.com/${ac.identifier}`;
    case 'twitter':
      return `https://twitter.com/${ac.identifier}`;
    case 'facebook':
      return `https://facebook.com/${ac.identifier}`;
    case 'instagram':
      return `https://instagram.com/${ac.identifier}`;
    case 'linkedIn':
      return `https://linkedin.com/in/${ac.identifier}`;
    case 'hackerNews':
      return `https://news.ycombinator.com/user?id=${ac.identifier}`;
    default:
      return '';
  }
};