'use strict';

var utils = require('../utils/writer.js');
var authUtils = require('../utils/auth.js');
var Order = require('../service/OrderService');

module.exports.getOrder = function getOrder (req, res, next, orderId) {
  authUtils.authenticateToken(req)
  .then((req) => {
    return Order.getOrder(req.user["_id"], orderId)
  })
  .then(function (response) {
    utils.writeJson(res, response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
};

module.exports.getOrderHistory = function getOrderHistory (req, res, next) {
  authUtils.authenticateToken(req)
  .then((req) => {
    return Order.getOrderHistory(req.user["_id"])
  })
  .then(function (response) {
    utils.writeJson(res, response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
};

module.exports.orderCart = function orderCart (req, res, next) {
  authUtils.authenticateToken(req)
  .then((req) => {
    return Order.orderCart(req.user["_id"])
  })
  .then(function (response) {
    utils.writeJson(res, response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
};
