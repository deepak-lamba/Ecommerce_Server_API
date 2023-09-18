'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// var mock_db = require('./mock_database/mock_db.js');
const dbModel = require('../models/User.js')


/**
 * Creates/registers/signs up a new user as per provided details
 *
 * body User Created user object
 * no response value expected for this operation
 **/
exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    // todo: check that the username doesn't already exist
    // hash password for safety
    protectPassword(body["password"])
    .then((protectedPasswd) => {
      body["password"] = protectedPasswd;
      let user = dbModel.User(body);
      user.save()
      .then((result) => {
        console.log(`New user with unique id ${result['_id']} created`)
        resolve(result);
      });
    })
    .catch((err) => {
      console.error(err);
      reject(err);
    });
  });
}


/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * userId Id Id of user to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function(userId) {
  return new Promise(function(resolve, reject) {
    dbModel.User.deleteOne({_id: userId})
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      console.error("Error in deleting user from database: " + err);
      reject(err);
    });
  });
}


/**
 * Get user by id
 *
 * userId Long Id of user to be fetched
 * returns User
 **/
exports.getUser = function(userId) {
  return new Promise(function(resolve, reject) {
    dbModel.User.findById(userId)
    .then((data) => {
      resolve(data);
    })
    .catch((err) => {
      console.error("Error in fetching user from database: " + err);
      reject(err);
    });
  });
}


/**
 * Logs user into the system
 *
 * username String The user name for login
 * password String Hash of the user password
 * returns inline_response_200
 **/
exports.loginUser = function(username, password) {
  return new Promise(function(resolve, reject) {
    // Authentication (checking that the user has given current login details (username, password))
    // DELETEME: copied as it is from https://youtu.be/Ud5xKCYQTjM?t=323
    //mock_db.load("users")
    dbModel.User.find()
    .then((users) => {
      const user = users.find(u => u["username"] == username);
      if (user === null || user === undefined) {
        throw new Error("Cannot find a user with this username in database");
      }
      // DELETEME: copied as it is from https://youtu.be/Ud5xKCYQTjM?t=736
      console.log(user);
      bcrypt.compare(password, user["password"])
      .then((passwdCorrect) => {
        if (!passwdCorrect) {
          throw new Error("Incorrect password");
        }
        // Authorization (authorizing an authenticated user to access our server)
        // DELETEME: copied as it is from https://youtu.be/mbsmsi7l3r4?t=541
        const accessToken = jwt.sign({"username": username, "_id": user._id}, process.env.ACCESS_TOKEN_SECRET)
        resolve({"accessToken" : accessToken});
        console.log("User login success");
      });
    })
    .catch((err) => {
      console.error(err);
      reject(err);
    });
  });
}


/**
 * Logs out current logged in user session (logic in its controller)
 *
 * no response value expected for this operation
 **/
exports.logoutUser = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update user with specified properties asked to be changed
 *
 * body User_userId_body Provide user properties to be changed and their new values (optional)
 * userId Id Id of user to be fetched
 * no response value expected for this operation
 **/
exports.updateUser = function(body,userId) {
  return new Promise(function(resolve, reject) {
    // todo: implement
    resolve();
  });
}


async function protectPassword(passwd) {
  // DELETEME: copied as it is from https://youtu.be/Ud5xKCYQTjM?t=542
  const salt = await bcrypt.genSalt();
  const hashedPasswd = await bcrypt.hash(passwd, salt);
  return hashedPasswd;
}
