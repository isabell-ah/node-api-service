exports.getProducts = (req, res) => {
  res.send(`These are all the products we have got`);
};

exports.createProducts = (req, res) => {
  res.send('A product has been created');
};
