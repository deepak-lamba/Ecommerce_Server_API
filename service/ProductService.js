'use strict';

//TODO Replace with mongo_db
//var mock_db = require('./mock_database/mock_db.js');
const dbModel = require('../models/Product.js')


/**
 * Get details of product with given id
 *
 * productId Id ID of product to fetch
 * returns Product
 **/
exports.getProduct = function(productId) {
  return new Promise(function(resolve, reject) {
    // mock_db.load("products")
    dbModel.Product.findById(productId)
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      console.error("Error in fetching product from database: " + err);
      reject(err);
    });
  });
}


/**
 * Finds products with optional categoryId based filtering
 *
 * categoryId Id Category id to be considered for filter (optional)
 * returns List
 **/
exports.getProducts = function(categoryId) {
  return new Promise(function(resolve, reject) {
    let filterOptions = {};
    if (categoryId !== undefined) {
      filterOptions["categoryId"] = categoryId;
    }
    dbModel.Product.find(filterOptions)
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      console.error("Error in fetching products from database: " + err);
      reject(err);
    });
  });
}

