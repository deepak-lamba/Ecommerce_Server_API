'use strict';

const orderDbModel = require('../models/Order.js')
const userDbModel = require('../models/User.js')

/**
 * Get order details by its id
 *
 * orderId Id ID of order to fetch
 * returns Order
 **/
exports.getOrder = function(userId, orderId) {
  return new Promise(function(resolve, reject) {
    orderDbModel.Order.findOne({"userId": userId, "_id": orderId})
    .then(order => resolve(order))
    .catch((err) => {
      console.error("Error in getting user order from database: " + err);
      reject(err);
    });
  });
}


/**
 * List all orders
 *
 * returns List
 **/
exports.getOrderHistory = function(userId) {
  return new Promise(function(resolve, reject) {
    orderDbModel.Order.find({"userId": userId})
    .then(orders => resolve(orders))
    .catch((err) => {
      console.error("Error in getting user orders from database: " + err);
      reject(err);
    });
  });
}


/**
 * Create/place an order with products in the cart
 *
 * no response value expected for this operation
 **/
exports.orderCart = function(userId) {
  return new Promise(function(resolve, reject) {
    userDbModel.User.findOne({"_id": userId})
      .populate("cart.products.productId")
      .then((user) => {
        const products = user.cart.products.map(p => {
          return {"productId": {...p.productId._doc}, "quantity": p.quantity};
        });
        const order = new orderDbModel.Order({
          userId: userId,
          products: products,
        });
        order.save()
        .then((result) => {
          user.clearCart();
          resolve(result);
        })
      })
      .catch((err) => {
        console.error("Error in getting placing user order from cart: " + err);
        reject(err);
      });
  });
}

