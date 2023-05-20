"use strict";

/** Routes for cache data. */

const jsonschema = require("jsonschema");

const express = require("express");
const router = new express.Router();
const { BadRequestError } = require("../expressError");
const BGAtlasApi = require("../BGAtlasApi");

/** GET /cache/games:  { } => {  }
 *
 * Returns json for top rated games limit 100.
 *
 * Authorization required: none
 */

router.get("/games", async function (req, res, next) {
  try {
    const games = await BGAtlasApi.getTopGames();
    return res.json(games);
  } catch (err) {
    return next(err);
  }
});

/** GET /cache/mechanics:  { } => {  }
 *
 * Returns json for game mechanics.
 *
 * Authorization required: none
 */

router.get("/mechanics", async function (req, res, next) {
  try {
    const mechanics = await BGAtlasApi.getGameMechanics();
    return res.json(mechanics);
  } catch (err) {
    return next(err);
  }
});

/** GET /cache/categories:  { } => {  }
 *
 * Returns json for game categories.
 *
 * Authorization required: none
 */

router.get("/categories", async function (req, res, next) {
  try {
    const cagtegories = await BGAtlasApi.getGameCategories();
    return res.json(cagtegories);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;