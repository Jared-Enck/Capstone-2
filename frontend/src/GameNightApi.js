import axios from 'axios';
import { config } from './constants';
const BASE_URL = config.BASE_URL;

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
      console.error('API Error:', err.response);
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

  /** Cache hot games */
  static async getHotCache() {
    let res = await this.request('api/cache/hot');
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

  /** Get next videos based on game title and nextPageToken */
  static async getVideos(videosRequest) {
    const res = await this.request('api/search-with-googleapis', videosRequest);
    return res;
  }

  /** Cache game complete obj */
  static async cacheGame(game) {
    await this.request('api/cache/games', game, 'post');
  }

  // ***Depricated due to new API***
  // /** Get game images, videos, mechanic names, and category names for specific game id */
  // static async getGame(gameID) {
  //   const res = await this.request(`api/game_media`, { gameID });
  //   return res;
  // }

  /** Get game ids in a user's collection */
  static async getGames(username) {
    const res = await this.request(`gameCollections/${username}`);
    return res;
  }

  /** Add game to currentUser collection */
  static async addGame({ gameID, username }) {
    const res = await this.request(
      `gameCollections/${username}`,
      { gameID },
      'post'
    );
    return res;
  }

  /** Remove game from currentUser collection */
  static async removeGame({ gameID, username }) {
    const res = await this.request(
      `gameCollections/${username}`,
      { gameID },
      'delete'
    );
    return res;
  }

  /** Get game data for game ids in currentUser's collection */
  static async getCollection(gameIDs) {
    const res = await this.request(`api/V1/collection`, {
      ids: gameIDs,
    });
    return res;
  }
}
