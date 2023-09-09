import axios from 'axios';

// const BASE_URL = 'https://mygamenights-backend-7938064403b3.herokuapp.com';
const BASE_URL = 'http://localhost:3001';

export default class GameNightApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug(
      'API Server Call:',
      endpoint,
      data.password ? data.username : data,
      method
    );

    const url = `${BASE_URL}/${endpoint}`;

    const headers = { Authorization: `${GameNightApi.token}` };
    const params = method === 'get' ? data : {};
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error('API Server Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes to server

  /**Registers new user */
  static async register(data) {
    // { username, password, email }
    return await this.request('auth/register', data, 'post');
  }

  /** Logs user in if username and password are correct */
  static async login(data) {
    let res = await this.request('auth/token', data, 'post');
    return res;
  }

  /** Gets user info */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res;
  }

  /** Update user info */
  static async updateUser(formData, username) {
    let res = await this.request(`users/${username}`, formData, 'patch');
    return res;
  }

  /** Delete user */
  static async deleteUser(username) {
    let res = await this.request(`users/${username}`, {}, 'delete');
    return res;
  }

  /** Get search results */
  static async getSearchResults(params, skipAmount) {
    const data = skipAmount ? { ...params, skip: skipAmount } : params;
    let res = await this.request('api/V2/search', data);
    return res;
  }

  /** Get current hot games */
  static async hotGames() {
    let res = await this.request('api/V2/hot');
    return res;
  }

  /** Cache mechanics and categories */
  static async getCommonCache() {
    let res = await this.request('api/cache');
    return res;
  }

  /** Get mechanic or category by id */
  static async getHeaderById(id) {
    let res = await this.request(`api/cache/${id}`);
    return res;
  }

  /** Checks game cache for game id */
  static async checkGameCache(gameID) {
    const res = await this.request('api/cache/games', { gameID });
    return res;
  }

  /** Cache game complete obj */
  static async cacheGame(game) {
    await this.request('api/cache/games', game, 'post');
  }

  /** Get game images, videos, mechanic names, and category names for specific game id */
  static async getGame(gameID) {
    const res = await this.request(`api/game_media`, { gameID });

    return res;
  }

  /** Get game ids in a user's collection */
  static async getGames(username) {
    const res = await this.request(`gameCollections/${username}`);
    return res;
  }

  /** Add game to currentUser collection */
  static async addGame({ id, username }) {
    const res = await this.request(
      `gameCollections/${username}`,
      { id },
      'post'
    );
    return res;
  }

  /** Remove game from currentUser collection */
  static async removeGame({ id, username }) {
    const res = await this.request(
      `gameCollections/${username}`,
      { id },
      'delete'
    );
    return res;
  }

  /** Get game data for game ids in currentUser's collection */
  static async getCollection(gameIDs) {
    const res = await this.request(`api/collection`, {
      ids: gameIDs,
      limit: 100,
    });
    return res;
  }
}
