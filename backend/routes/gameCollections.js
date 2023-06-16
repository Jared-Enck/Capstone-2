"use strict";

/** Routes for gameCollections. */

const express = require("express");
const { ensureLoggedIn, ensureOwner } = require("../middleware/auth");
const GameCollection = require("../models/gameCollection");

const router = express.Router();

/** GET /gameCollections/:username => { games }
 *
 * Returns { games: [gameID, ...] }
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

/** POST /gameCollections/:username  { username, game } => { msg }
 * 
 * where addGameObj = {
 *  username: 'u1', 
 *  game: {id: 'e44jncYuUp', name: 'Dune: Imperium'}
 * }
 *  
 * Authorization required: login, owner
 */

router.post("/:username", ensureLoggedIn, ensureOwner, async function (req, res, next) {
  try {
    const username = req.params.username;
    const game = req.body;
    const resp = await GameCollection.addGame({ username, game });
    return res.status(201).json( resp );
  } catch (err) {
    return next(err);
  }
});

/** DELETE /gameCollections/:username  { username, game } => { msg }
 * 
 * where addGameObj = {
 *  username: 'u1', 
 *  game: {id: 'e44jncYuUp', name: 'Dune: Imperium'}
 * }
 *  
 * Authorization required: login, owner
 */

router.delete("/:username", ensureLoggedIn, ensureOwner, async function (req, res, next) {
  try {
    const username = req.params.username;
    const game = req.body;
    const resp = await GameCollection.removeGame({ username, game });
    return res.json( resp );
  } catch (err) {
    return next(err);
  }
});

module.exports = router;