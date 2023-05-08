"use strict";

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

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
    const reqUserID = Number(req.params.userID);
    const isOwner = reqUserID === currUser.id

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
    const adminID = Number(req.body.adminUserID);

    const isGroupAdmin = adminID === currUser.id;

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
    const userIDs = new Set(req.body.userIDs);

    const isGroupUser = userIDs.has(currUser.id);

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
  ensureGroupUser
};