const axios = require("axios");
const { CLIENT_ID, API_BASE_URL } = require("./config");
const moment = require('moment');
const NodeCache = require("node-cache");
const commonCache = new NodeCache();
const gamesCache = new NodeCache();
const moreThanADay = require('./helpers/moreThanADay');

let APICachedDate;

class ThirdPartyApi {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${API_BASE_URL}/${endpoint}`;

    const params = (method === "get")
      ? { ...data, client_id: CLIENT_ID }
      : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.request.cause);
    };
  };

  // Individual API routes

  // Get common data
  static async cacheCommon() {
    if (!commonCache.has('mechanics') || !commonCache.has('categories')) {
      const results = await Promise.allSettled([
        this.request('game/mechanics'),
        this.request('game/categories'),
      ]);
      const failed = results.filter(r => r.status === 'rejected');

      if (failed.length) console.error({ errors: failed });

      const success = commonCache.mset([
        { key: 'mechanics', val: results[0].value.mechanics, ttl: 86400 },
        { key: 'categories', val: results[1].value.categories, ttl: 86400 }
      ]);
      const msg = success
        ? { success: 'Successfully cached data.' }
        : { failure: 'Failed to cache data.' };
      console.debug('Message: ', msg)
      return msg;
    };
  };

  static async getCommonCache() {
    const isDayOld = moreThanADay(APICachedDate);
    if (!APICachedDate || isDayOld) {
      const msg = await this.cacheCommon();
      if (msg.success) {
        APICachedDate = moment().format()
      };
    };
    return APICachedDate;
  };

  static checkCommon(term) {
    if (term) {
      const {
        mechanics,
        categories
      } = commonCache.mget(['mechanics', 'categories']);
      const results = {};
      const regexp = new RegExp(term, 'i');

      results.foundMechanics = mechanics.filter(m => regexp.test(m.name));
      results.foundCategories = categories.filter(c => regexp.test(c.name));

      return results;
    };
  };

  static checkGames(gameID) {
    const found = gamesCache.get(gameID);
    return found;
  };

  static async getSearchResults(query) {
    let results = {};
    if (query.name) {
      results = this.checkCommon(query.name);
    }
    const [key, val] = Object.entries(query)[0];
    const params =
      query.skip
        ? `${key}=${val}&skip=${query.skip}`
        : `${key}=${val}`;
    console.log('params: ', params)
    const response = await this.request('/search', { ...query, limit: '30' });
    const { games, count } = response;
    results.foundGames = games;
    return { results, count };
  };

  static cacheGame(game) {
    const found = gamesCache.get(game.id);
    if (!found) gamesCache.set(game.id, game, [14400]);
  };

  static async getCollection(ids) {
    const res = await this.request('/search', ids);
    return res;
  };

  static async getGameMedia({ gameID, mechanicIDs, categoryIDs }) {
    const data = { game_id: gameID }
    const setMechanics = new Set(mechanicIDs);
    const setCategories = new Set(categoryIDs);
    const { mechanics, categories } = commonCache.mget(['mechanics', 'categories']);

    const mechanicsRes = mechanics.filter(m => {
      if (setMechanics.has(m.id)) return m.name
    });

    const categoriesRes = categories.filter(c => {
      if (setCategories.has(c.id)) return c.name
    })

    const results = await Promise.allSettled([
      this.request('/game/images', data),
      this.request('/game/videos', data)
    ]);

    return {
      mechanicsRes,
      categoriesRes,
      detail_images: results[0].value.images,
      videos: results[1].value.videos
    }
  };
};

module.exports = ThirdPartyApi;
