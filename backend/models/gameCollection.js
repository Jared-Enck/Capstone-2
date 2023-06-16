"use strict";
const db = require("../db");

/** Related functions for collections. */

class GameCollection {

  /** Get all games in collection for a user. */
  static async getGames(username) {
    const results = await db.query(`
      SELECT 
        game_id AS "gameID"
      FROM game_collections
      WHERE username = $1`
      ,[username]);
    return results.rows.map(g => g.gameID);
  }

  /** Add games to a user's collection with username and game object
   * 
   * {username: 'u1', game: {id: 'e44jncYuUp', name: 'Dune: Imperium'}}
   * 
   * Returns { msg: `${game.name} has been added to your collection.` }
   * 
   **/

  static async addGame({username, game}) {
    const querySql = 
      `INSERT INTO game_collections
          (username, game_id)
        VALUES
          ($1,$2)`;

    await db.query(querySql,[username, game.id]);

    return {
      msg: `${game.name} has been added to your collection.`
    };
  };

  /** Remove games from a user's collection with username and game object
   * 
   * {username: 'u1', game: {id: 'e44jncYuUp', name: 'Dune: Imperium'}}
   * 
   * Returns { msg: `${game.name} has been removed from your collection.` }
   * 
   **/

  static async removeGame({username, game}) {
    const querySql = 
      `DELETE FROM game_collections
        WHERE username = $1 AND game_id = $2`;

    await db.query(querySql,[username, game.id]);

    return {
      msg: `${game.name} has been removed from your collection.`
    };
  };

};

module.exports = GameCollection;