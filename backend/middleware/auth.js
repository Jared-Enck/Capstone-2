'use strict';

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { UnauthorizedError } = require('../expressError');

/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      res.locals.user = jwt.verify(authHeader, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware to use when they must be owner user.
 *
 * If not, raises Unauthorized.
 */

function ensureOwner(req, res, next) {
  try {
    const currUser = res.locals.user;
    const reqUser = req.params.username;
    const isOwner = reqUser === currUser.username;

    if (!isOwner) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware to use when they must be group admin user.
 *
 * If not, raises Unauthorized.
 */

function ensureGroupAdmin(req, res, next) {
  try {
    const currUser = res.locals.user;
    const adminUsername = req.body.adminUsername;

    const isGroupAdmin = adminUsername === currUser.username;

    if (!isGroupAdmin) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware to use when they must be group user.
 *
 * If not, raises Unauthorized.
 */

function ensureGroupUser(req, res, next) {
  try {
    const currUser = res.locals.user;
    const groupUsers = new Set(req.body.groupUsers);

    const isGroupUser = groupUsers.has(currUser.username);

    if (!isGroupUser) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureOwner,
  ensureGroupAdmin,
  ensureGroupUser,
};
