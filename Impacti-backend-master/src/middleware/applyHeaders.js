module.exports = { applyHeaders: contentType => (req, res, next) => {
  res.header('content-type', contentType);
  next();
} };
