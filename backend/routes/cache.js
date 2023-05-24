"use strict";

/** Routes for cache data. */

const jsonschema = require("jsonschema");

const express = require("express");
const router = new express.Router();
const { BadRequestError } = require("../expressError");
const BGAtlasApi = require("../BGAtlasApi");

/** GET /cache/common: => { 
 *  games: [{game},...],
 *  mechanics: [{mechanic},...],
 *  categories: [{category},...]
 * }
 *
 * Returns json for top rated games limit 100, mechanics, and categories.
 *
 * Authorization required: none
 */

router.get("/common", async function (req, res, next) {
  try {
    const data = await BGAtlasApi.cacheCommon();
    return res.json(data);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;