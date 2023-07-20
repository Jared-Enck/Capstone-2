import axios from "axios";

const BASE_URL = "http://localhost:3001";

export default class GameNightApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Server Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;

    const headers = { Authorization: `${GameNightApi.token}` };
    const params = (method === "get")
      ? data
      : {};
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    };
  };

  // Individual API routes to db

  /**Registers new user */
  static async register(data) {
    // { username, password, email }
    let res = await this.request('auth/register', data, 'post');
    return res.token;
  };

  /** Logs user in if username and password are correct */
  static async login(data) {
    let res = await this.request('auth/token', data, 'post');
    return res.token;
  };

  /** Gets user info */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res;
  };

  /** Get search results */
  static async getSearchResults(params, skipAmount) {
    const data =
      skipAmount
        ? { ...params, skip: skipAmount }
        : params
    let res = await this.request('api/search', data);
    return res;
  };

  /** Cache mechanics and categories */
  static async getCommonCache() {
    let res = await this.request('api/cache');
    return res;
  };

  /** Checks game cache for game id */
  static async checkGameCache(gameID) {
    const res = await this.request('api/cache/games', { gameID });
    return res;
  };

  /** Cache game complete obj */
  static async cacheGame(game) {
    await this.request('api/cache/games', game, 'post');
  }

  /** Get game images, videos, mechanic names, and category names for specific game id */
  static async getGameMedia(gameID, mechanicIDs, categoryIDs) {
    const data = { gameID, mechanicIDs, categoryIDs };
    const res = await this.request(`api/game_media`, data);

    return res;
  };

  /** Get game ids in a user's collection */
  static async getGames(username) {
    const res = await this.request(`gameCollections/${username}`);
    return res;
  };

  /** Add game to currentUser collection */
  static async addGame({ id, username }) {
    const res = await this.request(`gameCollections/${username}`, { id }, 'post');
    return res;
  };

  /** Remove game from currentUser collection */
  static async removeGame({ id, username }) {
    const res = await this.request(`gameCollections/${username}`, { id }, 'delete');
    return res;
  };

  /** Get game data for game ids in currentUser's collection */
  static async getCollection(gameIDs) {
    const res = await this.request(`api/collection`, { ids: gameIDs, limit: 100 })
    return res;
  };
};
