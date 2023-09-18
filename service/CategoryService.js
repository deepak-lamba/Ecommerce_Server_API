'use strict';

// var mock_db = require('./mock_database/mock_db.js');
const dbModel = require('../models/Category.js')

/**
 * List all categories
 *
 * returns List
 **/
exports.getCategories = function() {
  return new Promise(function(resolve, reject) {
    // mock_db.load("categories")
    dbModel.Category.find()
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      console.error("Error in fetching categories from database: " + err);
      reject(err);
    });
  });
}

