"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");
const express = require("express");
const { 
  ensureLoggedIn, 
  ensureAdmin, 
  ensureOwnerOrAdmin 
} = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userRegisterSchema = require("../schemas/userRegister.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();


/** POST /admin { user }  => { user, token }
 *
 * Adds a new user. This is not the registration endpoint --- instead, this is
 * only for admin users to add new users. The new user being added can be an
 * admin.
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { id, username, email, isAdmin }, token }
 *
 * Authorization required: login, admin
 **/

router.post("/admin", ensureLoggedIn, ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});

/** POST / { user }  => { user, token }
 * 
 * General user registration. 
 **/

router.post("/", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userRegisterSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});

/** GET / => { users: [ {username, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: login, admin
 **/

router.get("/", ensureLoggedIn, ensureAdmin, async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});


/** GET /[userID] => { user }
 *
 * Returns { userID, username, email, isAdmin }
 *
 * Authorization required: login, owner user, or admin
 **/

router.get("/:userID", ensureLoggedIn, ensureOwnerOrAdmin, async function (req, res, next) {
  try {
    const user = await User.get(req.params.userID);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** PATCH /[userID] { user } => { user }
 *
 * Data can include:
 *   { username, password, email }
 *
 * Returns { userID, username, email, isAdmin }
 *
 * Authorization required: login, owner user, or admin
 **/

router.patch("/:userID", ensureLoggedIn, ensureOwnerOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const user = await User.update(req.params.userID, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[userID]  =>  { deleted: userID }
 *
 * Authorization required: login, owner user, or admin
 **/

router.delete("/:userID", ensureLoggedIn, ensureOwnerOrAdmin, async function (req, res, next) {
  try {
    await User.remove(req.params.userID);
    return res.json({ deleted: req.params.userID });
  } catch (err) {
    return next(err);
  }
});