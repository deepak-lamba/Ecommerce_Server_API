'use strict';

var utils = require('../utils/writer.js');
var authUtils = require('../utils/auth.js');
var User = require('../service/UserService');

module.exports.createUser = function createUser (req, res, next, body) {
  User.createUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUser = function deleteUser (req, res, next, userId) {
  authUtils.authenticateToken(req, userId)
  .then((req) => {
    return User.deleteUser(userId)
  })
  .then(function (response) {
    utils.writeJson(res, response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
};

module.exports.getUser = function getUser (req, res, next, userId) {
  authUtils.authenticateToken(req, userId)
  .then((req) => {
    return User.getUser(userId)
  })
  .then(function (response) {
    utils.writeJson(res, response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
};

module.exports.loginUser = function loginUser (req, res, next) {
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  User.loginUser(login, password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.logoutUser = function logoutUser (req, res, next, userId) {
  authUtils.authenticateToken(req, userId)
  .then((req) => {
    authUtils.destroyToken(req);
  })
  .then(User.logoutUser)
  .then(function (response) {
    utils.writeJson(res, response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
};

module.exports.updateUser = function updateUser (req, res, next, body, userId) {
  authUtils.authenticateToken(req, userId)
  .then((req) => {
    return User.updateUser(body, userId)
  })
  .then(function (response) {
    utils.writeJson(res, response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
};
