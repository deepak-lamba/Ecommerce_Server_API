'use strict';

var utils = require('../utils/writer.js');
var authUtils = require('../utils/auth.js');
var Cart = require('../service/CartService');

module.exports.deleteProductFromCart = function deleteProductFromCart (req, res, next, productId) {
  authUtils.authenticateToken(req)
  .then((req) => {
    return Cart.deleteProductFromCart(req.user["_id"], productId)
  }).then(function (response) {
    utils.writeJson(res, response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
};

module.exports.getCart = function getCart (req, res, next) {
  authUtils.authenticateToken(req)
  .then((req) => {
    return Cart.getCart(req.user["_id"])
  }).then(function (response) {
    utils.writeJson(res, response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
};

module.exports.updateProductInCart = function updateProductInCart (req, res, next, body, productId) {
  authUtils.authenticateToken(req)
  .then((req) => {
    return Cart.updateProductInCart(req.user["_id"], body, productId)
  })
  .then(function (response) {
    utils.writeJson(res, response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
};

module.exports.addProductToCart = function addProductToCart (req, res, next, productId) {
  authUtils.authenticateToken(req)
  .then((req) => {
    return Cart.addProductToCart(req.user["_id"], productId)
  })
  .then(function (response) {
    utils.writeJson(res, response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
};