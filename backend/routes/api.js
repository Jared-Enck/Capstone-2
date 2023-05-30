"use strict";

/** Routes for cache data. */

const jsonschema = require("jsonschema");

const express = require("express");
const router = new express.Router();
const { BadRequestError } = require("../expressError");
const ThirdPartyApi = require("../ThirdPartyApi");

/** GET /api/cache: => { 
 *  games: [{game},...],
 *  mechanics: [{mechanic},...],
 *  categories: [{category},...]
 * }
 *
 * Returns json for top rated games limit 100, mechanics, and categories.
 *
 * Authorization required: none
 */

router.get("/cache", async function (req, res, next) {
  try {
    const msg = await ThirdPartyApi.cacheCommon();
    return res.json(msg);
  } catch (err) {
    return next(err);
  }
});

/** GET /api/search: => { 
 *  searchTerm: 'some string'
 * }
 *
 * Returns json for 
 *
 * Authorization required: none
 */

router.get("/search", async function (req, res, next) {
  try {
    const term = req.query.term.toLowerCase();
    const results = await ThirdPartyApi.getSearchResults(term);
    return res.json(results);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;