function getBasePath(req, res, next) {
  if (req.requestContext && req.requestContext.path) {
    req.basePath = `/${req.requestContext.path.split('/')[1]}`;
  } else {
    req.basePath = '/';
  }

  next();
}

module.exports = getBasePath;
