const axios = require('axios');
const {
  BGG_API_BASE_V2,
  BGG_API_BASE_V1,
  YOUTUBE_API_KEY,
} = require('./config');
const { google } = require('googleapis');
const youtube = google.youtube({
  version: 'v3',
  auth: YOUTUBE_API_KEY,
});
const formatGame = require('./helpers/formatGame');
const convert = require('xml-js');
const moment = require('moment');
const NodeCache = require('node-cache');
const hotCache = new NodeCache();
const gamesCache = new NodeCache();
const moreThanADay = require('./helpers/moreThanADay');

let APICachedDate;

class ThirdPartyApi {
  // Request handler, converts xml response to json object
  static async bggRequest(endpoint, data = {}, method = 'get', version = 'V1') {
    console.debug('BGG API Call:', endpoint, data, method);

    const API_BASE = {
      V1: BGG_API_BASE_V1,
      V2: BGG_API_BASE_V2,
    };

    const url = `${API_BASE[version]}/${endpoint}`;

    const params = method === 'get' ? data : {};
    try {
      const xml = (await axios({ url, method, params })).data;
      return this.xmlConverter(xml, version);
    } catch (err) {
      console.error('API Error:', err);
      let message = err;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // static async youtubeRequest(endpoint, data = {}, method = 'get') {
  //   console.debug('YOUTUBE API Call:', endpoint, data, method);

  //   const url = `${YOUTUBE_API_BASE}/${endpoint}&key=${YOUTUBE_API_KEY}`;

  //   const params = method === 'get' ? data : {};
  //   try {
  //     return (await axios({ url, method, params })).data;
  //   } catch (err) {
  //     console.error('API Error:', err.response.statusText);
  //     let message = err.response.statusText;
  //     throw Array.isArray(message) ? message : [message];
  //   }
  // }

  // Convert xml to json
  static xmlConverter = (xml, version) => {
    const serialized = convert.xml2json(xml, { compact: true, spaces: 4 });

    const found = (serialized) => {
      const jsonItems = JSON.parse(serialized).items;
      if (jsonItems._attributes.total === '0') {
        return -1;
      } else {
        return jsonItems.item;
      }
    };

    const result =
      version === 'V2'
        ? found(serialized)
        : JSON.parse(serialized).boardgames.boardgame;

    if (result) {
      if (Array.isArray(result)) {
        return result.map((i) => this.flatten(i));
      } else {
        return this.flatten(result);
      }
    } else {
      return result;
    }
  };

  // Flatten nested node like objects
  static flatten = (obj) => {
    for (let key in obj) {
      if (obj[key]._text) obj[key] = obj[key]._text;

      if (obj[key]._attributes) {
        obj[key] = obj[key]._attributes.value || obj[key]._attributes;
      }

      if (Array.isArray(obj[key])) {
        obj[key].map((i) => {
          this.flatten(i);
        });
      }

      if (key === '_attributes') {
        for (let subKey in obj[key]) {
          obj[subKey] = obj[key][subKey];
        }
        delete obj[key];
      }
    }

    return obj;
  };

  // Get hot games data, then cache it
  static async cacheHot() {
    hotCache.flushAll();
    const hotness = await this.bggRequest(
      'hot?type=boardgame',
      {},
      'get',
      'V2'
    );
    hotCache.set('hotGames', hotness);

    return hotCache.has('hotGames');
  }

  static async getHotCache() {
    const isDayOld = moreThanADay(APICachedDate);
    if (!APICachedDate || isDayOld) {
      const success = await this.cacheHot();
      if (success) {
        APICachedDate = moment().format();
      } else {
        throw new Error('Failed to cache hot games');
      }
    }
    return await hotCache.get('hotGames');
  }
  // *** Depricated as new API does not support endpoints
  //   for mechanic or category search ***

  // static checkCommonByName(name) {
  //   const { mechanics, categories } = commonCache.mget([
  //     'mechanics',
  //     'categories',
  //   ]);

  //   const results = {};
  //   const regexp = new RegExp(name, 'i');

  //   results.foundMechanics = mechanics.filter((m) => regexp.test(m.name));
  //   results.foundCategories = categories.filter((c) => regexp.test(c.name));

  //   return results;
  // }

  // static checkCommonByID(id) {
  //   const { mechanics, categories } = commonCache.mget([
  //     'mechanics',
  //     'categories',
  //   ]);

  //   let found;

  //   const foundMechanic = mechanics.filter((m) => m.id === id);

  //   if (foundMechanic.length) {
  //     found = foundMechanic[0];
  //   } else {
  //     const foundCategory = categories.filter((c) => c.id === id);
  //     if (!foundCategory.length) return -1;
  //     found = foundCategory[0];
  //   }

  //   return found.name;
  // }

  static async checkGames(query) {
    const { gameID } = query;
    if (!Number(gameID)) return -1;

    const found = gamesCache.get(`${gameID}`);

    if (!found) {
      try {
        const game = await this.getGame(gameID);
        if (game === -1) {
          return game;
        } else {
          gamesCache.set(gameID, game, [14400]);
          return game;
        }
      } catch (err) {
        console.error(err);

        throw new Error(err);
      }
    }

    return found;
  }

  static async getGame(gameID) {
    try {
      const res = await this.bggRequest(`boardgame/${gameID}`);
      if (!res.error) {
        formatGame(res);
        res.videos = await this.getVideos(res.name);
        return res;
      } else {
        return -1;
      }
    } catch (err) {
      console.error(err);
    }
  }

  static async getVideos(title, nextPageToken = '', maxResults = 6) {
    try {
      const params = {
        q: `${title} how to play`,
        relevanceLanguage: 'en',
        type: 'video',
        maxResults: maxResults,
        part: 'snippet',
        pageToken: nextPageToken,
      };
      console.debug('YT API Call:', params, 'get');
      return (await youtube.search.list(params)).data;
    } catch (err) {
      console.error('Error: ', err.config.url, err.config.params, err.errors);
      let message = err.errors;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getSearchResults(query) {
    const [key, val] = Object.entries(query)[0];

    const queryStr = query.skip
      ? `${key}=${val}&skip=${query.skip}`
      : `${key}=${val}`;

    const res = await this.bggRequest(
      `search?${queryStr}&type=boardgame`,
      {},
      'get',
      'V2'
    );

    // Exclude fan made expansions from results

    const regexp = new RegExp('fan expansion', 'i');

    return res.filter((i) => !regexp.test(i.name));
  }

  static async getCollection(query) {
    const res = await this.bggRequest(
      `boardgame/${query.ids}`,
      {},
      'get',
      'V1'
    );
    return res;
  }
}

module.exports = ThirdPartyApi;
