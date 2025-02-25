const Product = require('../models/productModel');
const Products = require('../models/productModel');

const getAllProducts = async (req, res) => {
  try {
    // with query it is good to define the field that you will be using
    const { featured, company, name } = req.query;
    const queryObject = {};
    if (featured) {
      queryObject.featured = featured === 'true' ? true : false;
    }
    if (company) {
      queryObject.company = company;
    }
    if (name) {
      // queryObject.name = company
      queryObject.name = { $regex: name, $options: 'i' };
    }
    console.log(queryObject);
    // const products = await Products.find(req.query);
    const products = await Products.find(queryObject).sort({ price: -1 });

    res.status(200).json({ nbHits: products.length, products });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findOne({ _id: productId });
    !product
      ? res.status(400).res.json({ msg: `No product with id ${productId}` })
      : res.status(200).json({ product });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = { getAllProducts, createProduct, getProduct };
