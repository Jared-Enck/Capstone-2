const axios = require("axios");

const { CLIENT_ID, API_BASE_URL } = require("./config");


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

  // Get top 100 games
  static async getTopGames() {
    const fields = 'id,name,year_published,min_players,max_players,min_playtime,max_playtime,min_age,description,description_preview,thumb_url,image_url,primary_publisher,mechanics,categories,designers,developers';
    const data = {
      limit: 100,
      order_by: 'rank',
      fields
    };
    let res = await this.request('search', data);
    return res;
  };

  // Get game mechanics
  static async getGameMechanics() {
    let res = await this.request('game/mechanics');
    return res;
  }

  // Get game categories
  static async getGameCategories() {
    let res = await this.request('game/categories');
    return res;
  }
};

module.exports = BGAtlasApi;
