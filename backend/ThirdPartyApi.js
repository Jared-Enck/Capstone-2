const axios = require("axios");
const { CLIENT_ID, API_BASE_URL } = require("./config");
const fields = require('./helpers/gameObjFields');
const NodeCache = require("node-cache");
const myCache = new NodeCache();

class ThirdPartyApi {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${API_BASE_URL}/${endpoint}`;
    
    const params = (method === "get")
      ? {...data, client_id: CLIENT_ID}
      : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    };
  };
  
  // Individual API routes

  // Get common data
  static async cacheCommon() {
    if (!myCache.has('games') || !myCache.has('mechanics') || !myCache.has('categories')) {
      const results = await Promise.allSettled([
        this.request('/search',{ fields, limit: 100, order_by: 'rank' }),
        this.request('game/mechanics'),
        this.request('game/categories'),
      ]);
  
      const failed = results.filter(r => r.status === 'rejected');
  
      if (failed.length) console.error({ errors: failed });
      
      const success = myCache.mset([
        { key: 'games', val: results[0].value.games, ttl: 86400 },
        { key: 'mechanics', val: results[1].value.mechanics, ttl: 86400 },
        { key: 'categories', val: results[2].value.categories, ttl: 86400 }
      ]);
      const msg = success ? 'Successfully cached data.' : 'Failed to cache data.';

      return { msg };
    };
  };

  static checkCache(term) {
    const { 
      games, 
      mechanics, 
      categories 
    } = myCache.mget(['games', 'mechanics', 'categories']);
    const results = {};
    const regexp = new RegExp(term, 'i');

    results.foundMechanics = mechanics.filter(m => regexp.test(m.name));
    results.foundCategories = categories.filter(c => regexp.test(c.name));
    results.foundGames = games.filter(g => regexp.test(g.name))

    return results;
  };

  static async getSearchResults(term) {
    const results = this.checkCache(term);
    const cachedGames = results.foundGames;

    if (!cachedGames.length || cachedGames.length < 5) {
      const data = { 
        name: term, 
        fields 
      }
      const { games } = await this.request('/search', data);
      results.foundGames = games;
    }
    return results;
  };

  static async getRefinedResults(query) {
    const data = {
      ...query,
      fields
    }
    const { games } = await this.request('/search',data);
    return games;
  };

  static cacheGame(game) {
    if (!myCache.has('games')) {
      myCache.set('games', [game], [ 14400 ]);
    };
    const games = myCache.get('games');
    games.push(game)
  };
};

module.exports = ThirdPartyApi;
