"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

/** Related functions for collections. */

class GameCollection {
  /** Add games to a user's collection with userID and game object
   * 
   * {userID: 1, game: {id: 'e44jncYuUp', name: 'Dune: Imperium'}}
   * 
   * Returns { msg: `${game.name} has been added to your collection.` }
   * 
   **/

  static async addGame({userID, game}) {
    const querySql = 
      `INSERT INTO game_collections
          (user_id, game_id)
        VALUES
          ($1,$2)`;

    await db.query(querySql,[userID, game.id]);

    return {
      msg: `${game.name} has been added to your collection.`
    };
  };

  /** Remove games from a user's collection with userID and game object
   * 
   * {userID: 1, game: {id: 'e44jncYuUp', name: 'Dune: Imperium'}}
   * 
   * Returns { msg: `${game.name} has been removed from your collection.` }
   * 
   **/

  static async removeGame({userID, game}) {
    const querySql = 
      `DELETE FROM game_collections
        WHERE user_id = $1 AND game_id = $2`;

    await db.query(querySql,[userID, game.id]);

    return {
      msg: `${game.name} has been removed from your collection.`
    };
  };

};

module.exports = GameCollection;