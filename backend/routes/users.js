'use strict';

/** Routes for users. */

const jsonschema = require('jsonschema');
const express = require('express');
const { ensureLoggedIn, ensureOwner } = require('../middleware/auth');
const { createToken } = require('../helpers/tokens');
const formatErrors = require('../helpers/formatErrors');
const { BadRequestError } = require('../expressError');
const User = require('../models/user');
const userUpdateSchema = require('../schemas/userUpdate.json');

const router = express.Router();

/** GET /[username] => { user }
 *
 * Returns { username, email, imageURL }
 *  games = [gameID, ...]
 *  groups = [groupID, ...]
 * Authorization required: login, owner user
 **/

router.get(
  '/:username',
  ensureLoggedIn,
  ensureOwner,
  async function (req, res, next) {
    try {
      const { user } = await User.get(req.params.username);
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }
);

/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { username, password, email, imageURL }
 *
 * Returns { username, email, imageURL }
 *
 * Authorization required: login, owner user
 **/

router.patch(
  '/:username',
  ensureLoggedIn,
  ensureOwner,
  async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, userUpdateSchema);
      if (!validator.valid) {
        const errs = validator.errors.map((e) => e);
        const formattedErrs = formatErrors(errs);
        throw new BadRequestError(formattedErrs);
      }
      const user = await User.update(req.params.username, req.body);
      let response;
      if (req.body.username) {
        const token = createToken(user);
        response = { token, user };
      } else {
        response = { user };
      }
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  }
);

/** DELETE /:username  =>  { deleted: username }
 *
 * Authorization required: login, owner user
 **/

router.delete(
  '/:username',
  ensureLoggedIn,
  ensureOwner,
  async function (req, res, next) {
    try {
      const username = req.params.username;
      await User.remove(username);
      return res.json({ deleted: username });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
