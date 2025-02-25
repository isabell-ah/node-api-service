const errorHandler = (err, req, res, next) => {
  res.status(500).json({ msg: err.message });
};
module.exports = errorHandler;
