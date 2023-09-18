const jwt = require('jsonwebtoken');

const cacheUtil = require('../utils/cache.js');
const dbModel = require('../models/User.js')

exports.authenticateToken = function (req, userId=null) {
    return new Promise((resolve, reject) => {
        // DELETEME: copied as it is from https://youtu.be/mbsmsi7l3r4?t=800
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token === null) {
            // swagger middleware will also verify for this though
            reject("No authorization header found");
            return;
        }
        cacheUtil.get(token)
        .then((tokenBlackListed) => {
            if (tokenBlackListed) {
                reject("Unauthorized: Token expired/invalid");
                return;
            }
        });
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                throw new Error("Token verification error:", err);
            }
            if (userId === null) {
                console.log("Requesting user has valid token and access rights for endpoint");
                req.user = user;
                resolve(req);
                return;
            }

            // check that the requesting user is accessing endpoints related to its own account
            if (user["_id"] !== userId) {
                reject("Endpoint outside user access scope");
                return;
            }
            console.log("Requesting user has valid token and access rights for endpoint");
            req.user = user;
            resolve(req);
        });
    })
}

exports.destroyToken = function (req) {
    return new Promise((resolve, reject) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token === null) {
            // swagger middleware will also verify for this though
            resolve("Already no authorization header found");
            return;
        }
        // blackList token
        cacheUtil.set(token, token)  // after an expiry is added to token, add expiry-now as required duration in keyv
        .then(() => {
            console.log("user logged out");
            resolve("user logged out");
        })
    })
}
