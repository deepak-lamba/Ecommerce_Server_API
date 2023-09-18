'use strict';

var utils = require('../utils/writer.js');
var Product = require('../service/ProductService');

module.exports.getProduct = function getProduct (req, res, next, productId) {
  Product.getProduct(productId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getProducts = function getProducts (req, res, next, categoryId) {
  Product.getProducts(categoryId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
