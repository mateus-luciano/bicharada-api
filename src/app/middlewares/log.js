export default (req, res, next) => {
  const { method, url, params, query, body, ip } = req;
  // eslint-disable-next-line no-console
  console.log(method, url, params, query, body, ip);

  next();
};
