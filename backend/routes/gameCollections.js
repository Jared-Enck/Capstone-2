"use strict";

/** Routes for gameCollections. */

const express = require("express");
const { ensureLoggedIn, ensureOwner } = require("../middleware/auth");
const GameCollection = require("../models/gameCollection");

const router = express.Router();

/** GET /gameCollections/:username => { games }
 *
 * Returns { games: ['gameID', ...] }
 * 
 * Authorization required: login, owner user
 **/

router.get("/:username", ensureLoggedIn, ensureOwner, async function (req, res, next) {
  try {
    const games = await GameCollection.getGames(req.params.username);
    return res.json({ games });
  } catch (err) {
    return next(err);
  }
});

/** POST /gameCollections/:username  { id } => { msg }
 * 
 * {
 *  id: 'e44jncYuUp'
 * }
 *  
 * Authorization required: login, owner
 */

router.post("/:username", ensureLoggedIn, ensureOwner, async function (req, res, next) {
  try {
    const username = req.params.username;
    const { id } = req.body;
    await GameCollection.addGame({ username, id });
    return res.status(201).json('added');
  } catch (err) {
    return next(err);
  }
});

/** DELETE /gameCollections/:username  { id } => { msg }
 * 
 * {
 *  id: 'e44jncYuUp'
 * }
 *  
 * Authorization required: login, owner
 */

router.delete("/:username", ensureLoggedIn, ensureOwner, async function (req, res, next) {
  try {
    const username = req.params.username;
    const { id } = req.body;
    const result = await GameCollection.removeGame({ username, id });
    const statusCode = result === -1 ? 204 : 200;
    return res.status(statusCode).json('deleted');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;