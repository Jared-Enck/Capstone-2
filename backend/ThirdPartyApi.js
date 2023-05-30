const axios = require("axios");
const { CLIENT_ID, API_BASE_URL } = require("./config");
const fields = require('./helpers/gameObjFields');
const NodeCache = require("node-cache");
const games = new NodeCache();
const mechanics = new NodeCache();
const categories = new NodeCache();

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

  static cacheData = (arr, cache, ttl = [ 86400 ]) => {
    arr.map(i => {
      const itemName = i.handle || i.name.toLowerCase();
      cache.set(itemName, i, ttl);
    });
  };

  static checkCached = (term) => {
    const game = games.get(term);
    const mechanic = mechanics.get(term);
    const category = categories.get(term);

    return {
      game,
      mechanic,
      category
    }
  };
  
  // Individual API routes

  // Get common data
  static async cacheCommon() {
    if (!Object.keys(mechanics.data).length && !Object.keys(categories.data).length) {
      const results = await Promise.allSettled([
        this.request('game/mechanics'),
        this.request('game/categories'),
      ]);
  
      const failed = results.filter(r => r.status === 'rejected');
  
      if (failed.length) console.error({ errors: failed });
  
      this.cacheData(results[0].value.mechanics, mechanics);
      this.cacheData(results[1].value.categories, categories);
  
      return { msg: 'Successfully cached data.' };
    }
  };

  static async getSearchResults(term) {
    const found = this.checkCached(term);
    const { game, mechanic, category } = found;
    // if cache miss
    if (!game && !mechanic && !category) {
      // call api
      console.log('calling API with game:', term)
      const result = await this.request('/search',{name: term, fields})
      this.cacheData(result.games, games, [ 3600 ])
      return result;
    };
    return found;
  };

};

module.exports = ThirdPartyApi;
