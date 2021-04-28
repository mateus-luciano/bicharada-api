export default (req, res, next) => {
  const { method, url, params, query, ip } = req;
  console.log(method, url, params, query, ip);

  next();
};
