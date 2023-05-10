"use strict";

/** Routes for gameCollections. */

const express = require("express");
const { ensureLoggedIn, ensureOwner } = require("../middleware/auth");
const GameCollection = require("../models/gameCollection");

const router = express.Router();

/** POST /gameCollections/:userID  { userID, game } => { msg }
 * 
 * where addGameObj = {
 *  userID: 1, 
 *  game: {id: 'e44jncYuUp', name: 'Dune: Imperium'}
 * }
 *  
 * Authorization required: login, owner
 */

router.post("/:userID", ensureLoggedIn, ensureOwner, async function (req, res, next) {
  try {
    const userID = Number(req.params.userID);
    const game = req.body;
    const resp = await GameCollection.addGame({ userID, game });
    return res.json( resp );
  } catch (err) {
    return next(err);
  }
});

/** DELETE /gameCollections/:userID  { userID, game } => { msg }
 * 
 * where addGameObj = {
 *  userID: 1, 
 *  game: {id: 'e44jncYuUp', name: 'Dune: Imperium'}
 * }
 *  
 * Authorization required: login, owner
 */

router.delete("/:userID", ensureLoggedIn, ensureOwner, async function (req, res, next) {
  try {
    const userID = Number(req.params.userID);
    const game = req.body;
    const resp = await GameCollection.removeGame({ userID, game });
    return res.json( resp );
  } catch (err) {
    return next(err);
  }
});

module.exports = router;