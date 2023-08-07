'use strict';
const db = require('../db');

/** Related functions for collections. */

class GameCollection {
  /** Get all games in collection for a user. */
  static async getGames(username) {
    const results = await db.query(
      `
      SELECT 
        game_id AS "gameID"
      FROM game_collections
      WHERE username = $1`,
      [username]
    );
    return results.rows.map((g) => g.gameID);
  }

  /** Add games to a user's collection with username and game object
   *
   * {username: 'u1', id: 'e44jncYuUp'}
   *
   **/

  static async addGame({ username, id }) {
    const querySql = `INSERT INTO game_collections
          (username, game_id)
        VALUES
          ($1,$2)`;

    await db.query(querySql, [username, id]);
  }

  /** Remove games from a user's collection with username and game object
   *
   * {username: 'u1', id: 'e44jncYuUp'}
   *
   **/

  static async removeGame({ username, id }) {
    const querySql = `DELETE FROM game_collections
        WHERE username = $1 AND game_id = $2
        RETURNING game_id AS "gameID"`;

    const results = await db.query(querySql, [username, id]);

    return results.rows.length > 0 ? 'deleted' : -1;
  }
}

module.exports = GameCollection;
