const axios = require("axios");
const { CLIENT_ID, API_BASE_URL } = require("./config");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

class BGAtlasApi {
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
    const fields = 'id,name,year_published,min_players,max_players,min_playtime,max_playtime,min_age,description,description_preview,thumb_url,image_url,primary_publisher,mechanics,categories,designers,developers';
    const data = {
      limit: 100,
      order_by: 'rank',
      fields
    };
    const results = await Promise.allSettled([
      this.request('search', data),
      this.request('game/mechanics'),
      this.request('game/categories')
    ]);

    const failedResults = results.filter(r => r.status === 'rejected');

    if (failedResults.length) console.error({ errors: failedResults })

    myCache.mset([
      {key: "games", val: results[0].value.games, ttl: 86400},
      {key: "mechanics", val: results[1].value.mechanics, ttl: 86400},
      {key: "categories", val: results[2].value.categories, ttl: 86400}
    ]);

    return { msg: 'Successfully cached data.' };
  };

};

module.exports = { BGAtlasApi, myCache };
