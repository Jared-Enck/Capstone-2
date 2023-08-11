'use strict';

/** Routes for third party api. */

const express = require('express');
const router = new express.Router();
const ThirdPartyApi = require('../ThirdPartyApi');

/** GET /api/cache => { date }
 *
 * Checks ApiCacheDate
 * and requests data if no date or date past 24 hrs.
 *
 * Returns json date when cache last updated.
 *
 * Authorization required: none
 */

router.get('/cache', async function (req, res, next) {
  try {
    const date = await ThirdPartyApi.getCommonCache();
    return res.json({ date });
  } catch (err) {
    return next(err);
  }
});

/** GET /api/cache/games => { game }
 *
 * Gets game if in cache
 *
 * Returns json game obj or undefined.
 *
 * Authorization required: none
 */

router.get('/cache/games', function (req, res, next) {
  try {
    const { gameID } = req.query;
    const result = ThirdPartyApi.checkGames(gameID);
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

/** GET /api/cache/:id => "Deck Building"
 *
 * Gets mechanic or category name from cache
 *
 * Returns name or -1 if not found.
 *
 * Authorization required: none
 */

router.get('/cache/:id', function (req, res, next) {
  try {
    const { id } = req.params;
    const result = ThirdPartyApi.checkCommonByID(id);
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

/** POST /api/cache/games => { date }
 *
 * Checks cache if game already in cache
 * if not, cache game
 *
 * Returns json date when cache last updated.
 *
 * Authorization required: none
 */

router.post('/cache/games', function (req, res, next) {
  try {
    const game = req.body;
    ThirdPartyApi.cacheGame(game);
    return res.status(201);
  } catch (err) {
    return next(err);
  }
});

/** GET /api/search: => { 
 *  foundMechanics: [obj,...],
    foundCategories: [obj,...],
    foundGames: [obj,...],
 * }
 * 
 * Takes search term and checks cache for matches,
 * sends request to api for games that match
 *
 * Returns json for found items
 * 
 * else sends request to api for games that match 
 *  category or mechanic from query string
 *
 * Authorization required: none
 */

router.get('/search', async function (req, res, next) {
  try {
    const query = req.query;
    const results = await ThirdPartyApi.getSearchResults(query);
    return res.json(results);
  } catch (err) {
    return next(err);
  }
});

/** GET /api/games: => [{game},...]
 *
 * Takes string of game ids,
 * sends request to api for games that match
 *
 * Returns json for found items
 *
 * Authorization required: login, owner user
 */

router.get('/collection', async function (req, res, next) {
  try {
    const query = req.query;
    const results = await ThirdPartyApi.getCollection(query);
    return res.json(results);
  } catch (err) {
    return next(err);
  }
});

/** Get /api/game_media 
 * 
 * {gameID: '78ZDzlpvdb', mechanicIDs: [id,...], categoryIDs: [id,...]}
 *  => {
 *    mechanicsRes: [obj,...];
      categoriesRes: [obj,...];
      detail_images: [obj,...];
      videos: [obj,...];
 * }
 * 
 * Gets names for mechanics and categories from id arrays
 * 
 * Requests api for game images and videos for gameID
 * 
 * Returns json obj with all results
 * 
 * Authorization required: none
*/

router.get('/game_media', async function (req, res, next) {
  try {
    const results = await ThirdPartyApi.getGameMedia(req.query);
    return res.json(results);
  } catch {
    return next(err);
  }
});

module.exports = router;
