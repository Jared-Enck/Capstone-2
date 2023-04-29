"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");
const express = require("express");
const { 
  ensureLoggedIn,
  ensureOwner 
} = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

/** GET /[userID] => { user }
 *
 * Returns { userID, username, email, games }
 *  games = [gameID, ...]
 * Authorization required: login, owner user
 **/

router.get("/:userID", ensureLoggedIn, ensureOwner, async function (req, res, next) {
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
 * Returns { userID, username, email }
 *
 * Authorization required: login, owner user
 **/

router.patch("/:userID", ensureLoggedIn, ensureOwner, async function (req, res, next) {
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
 * Authorization required: login, owner user
 **/

router.delete("/:userID", ensureLoggedIn, ensureOwner, async function (req, res, next) {
  try {
    await User.remove(req.params.userID);
    return res.json({ deleted: req.params.userID });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;