"use strict";

/** Routes for groups. */

const jsonschema = require("jsonschema");
const express = require("express");
const { 
  ensureLoggedIn,
  ensureOwner,
  ensureGroupAdmin
} = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Group = require("../models/group");
const newGroupSchema = require("../schemas/groupNew.json");
const groupAddUsersSchema = require("../schemas/groupAddUsers.json");

const router = express.Router();

/** POST /groups   { group } => { id, name, adminUserID, imageURL, msg }
 *
 * Create new group
 * 
 * group must include { users , name }
 *  where users = [{id: 1, username: 'u1'}, ...]
 *
 * Authorization required: login
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, newGroupSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const result = await Group.create({ ...req.body });
    return res.status(201).json( result );
  } catch (err) {
    return next(err);
  }
});

/** POST /groups/:groupID   { groupID, users } => { msg }
 * 
 * Add users to existing group
 * 
 * where users = [{id: 1, username: 'u1'}, ...]
 *
 * Authorization required: login
 */

router.post("/:groupID", ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, groupAddUsersSchema);
    if (!validator.valid) {
      console.log('schema issue')
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const groupID = Number(req.params.groupID);
    const { users } = req.body

    const { msg } = await Group.addUsers({groupID, users});
    return res.status(201).json( msg );
  } catch (err) {
    return next(err);
  }
});

/** DELETE /:groupID  =>  { deleted: groupID }
 *
 * Authorization required: login, group admin user
 **/

router.delete("/:groupID", ensureLoggedIn, ensureGroupAdmin, async function (req, res, next) {
  try {
    const groupID = Number(req.params.groupID);
    await Group.delete(groupID);
    return res.json({ deleted: Number(req.params.groupID) });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;