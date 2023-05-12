import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
// const BGA_BASE_URL = process.env.BGA_API_BASE_URL;

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

export default class GameNightApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

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
    }
  };

  // Individual API routes

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
    return res.user;
  };
};
