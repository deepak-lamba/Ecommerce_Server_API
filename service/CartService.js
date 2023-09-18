'use strict';

const dbModel = require('../models/User.js')

/**
 * Delete product from cart
 *
 * productId Id id of product that needs to be updated
 * no response value expected for this operation
 **/
exports.deleteProductFromCart = function(userId, productId) {
  return new Promise(function(resolve, reject) {

    dbModel.User.findOne({"_id": userId})
    .then((user) => {
      user.deleteFromCart(productId)
      .then((result) => {
        console.log("Product deleted from cart");
        resolve(result);
      })
    })
    .catch((err) => {
      console.error("Error in deleting product from cart: " + err);
      reject(err);
    });
  });
}


/**
 * List all product orders in the cart
 *
 * returns List
 **/
exports.getCart = function(userId) {
  return new Promise(function(resolve, reject) {

    dbModel.User.findOne({"_id": userId})
    .populate("cart.products.productId")
    .then((user) => {
      console.log(user);
      resolve(user.cart.products);
    })
    .catch((err) => {
      console.error("Error in getting cart from database: " + err);
      reject(err);
    });
  });
}


/**
 * Update product quantity with properties to be changed
 *
 * body Product_productId_body  (optional)
 * productId Id Id of product whose quantity to be changed
 * no response value expected for this operation
 **/
exports.updateProductInCart = function(userId, body, productId) {
  return new Promise(function(resolve, reject) {

    dbModel.User.findOne({"_id": userId})
    .then((user) => {
      return user.updateProductInCart(productId, body)
            .then((result) => {
              console.log("Product updated in cart");
              resolve(result);
            })
    })
    .catch((err) => {
      console.error("Error in updating product to cart in database: " + err);
      reject(err);
    });
  });
}

/**
 * Add specified product to cart
 *
 * productId Id ID of product to fetch
 * no response value expected for this operation
 **/
exports.addProductToCart = function(userId, productId) {
  return new Promise(function(resolve, reject) {

    dbModel.User.findOne({"_id": userId})
    .then((user) => {
      return user.addToCart(productId);
    })
    .then((result) => {
      console.log("added/(qty. updated of) product in cart", result);
      resolve(result);
    })
    .catch((err) => {
      console.error("Error in putting product to cart in database: " + err);
      reject(err);
    });
  });
}
