const Product = require('../models/productModel');

exports.getAllProducts = (req, res) => {
  Product.getAll((err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

exports.getProductById = (req, res) => {
  const { id } = req.params;
  Product.getById(id, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results[0]);
    }
  });
};

exports.createProduct = (req, res) => {
  const newProduct = req.body;
  Product.create(newProduct, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json({ id: results.insertId, ...newProduct });
    }
  });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  Product.update(id, updatedProduct, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(updatedProduct);
    }
  });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  Product.delete(id, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).send();
    }
  });
};
