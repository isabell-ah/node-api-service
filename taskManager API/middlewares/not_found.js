const notFound = (req, res) => {
  res.status(404).send('Route does nt exist');
};

module.exports = notFound;
