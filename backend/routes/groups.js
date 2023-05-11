"use strict";

/** Routes for groups. */

const jsonschema = require("jsonschema");
const express = require("express");
const { 
  ensureLoggedIn,
  ensureGroupAdmin,
  ensureGroupUser,
  ensureOwner
} = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Group = require("../models/group");
const newGroupSchema = require("../schemas/groupNew.json");
const groupAddUsersSchema = require("../schemas/groupAddUsers.json");
const groupUpdateSchema = require("../schemas/groupUpdate.json");

const router = express.Router();

/** POST /groups   { group } => { id, name, adminUsername, imageURL, msg }
 *
 * Create new group
 * 
 * group must include { users , name }
 *  where users = ['u1', ...]
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
 * where users = ['u1', ...]
 *
 * Authorization required: login, group user
 */

router.post("/:groupID", ensureLoggedIn, ensureGroupUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, groupAddUsersSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const groupID = Number(req.params.groupID);
    const { addUsers } = req.body
    console.log(addUsers)
    const resp = await Group.addUsers(groupID, addUsers);
    return res.status(201).json( resp );
  } catch (err) {
    return next(err);
  }
});

/** PATCH /:groupID/edit { group } => { group }
 *
 * Data can include:
 *   { name, imageURL }
 *
 * Returns { groupID, name, imageURL }
 *
 * Authorization required: login, group user
 **/

router.patch("/:groupID/edit", ensureLoggedIn, ensureGroupUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, groupUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    delete req.body.groupUsers;

    const groupID = Number(req.params.groupID)

    const group = await Group.update(groupID, req.body);
    return res.json( group );
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
    return res.json({ deleted: groupID });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /:groupID/leave => { msg: 'username' left the group }
 *
 * Authorization required: login, owner, group user
 **/

router.patch("/:groupID/leave", ensureLoggedIn, async function (req, res, next) {
  try {
    const groupID = Number(req.params.groupID);
    const username = req.body.username
    await Group.leave(groupID,username);
    return res.json({ msg: `${username} left the group.`})
  } catch (err) {
    return next(err)
  }
});

module.exports = router;