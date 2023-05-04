"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { username, email }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/
  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
      `SELECT 
        id,
        username,
        password
      FROM users
      WHERE username = $1`,
      [username],
    );

    let userBasic = result.rows[0];

    if (userBasic) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, userBasic.password);
      if (isValid === true) {
        const {user} = await User.get(userBasic.id);
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, email }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register(
    { username, password, email }
  ) {
    const duplicateCheck = await db.query(
      `SELECT username
      FROM users
      WHERE username = $1`,
      [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Invalid username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
        (username, password, email)
      VALUES ($1, $2, $3)
      RETURNING id`,
      [
        username,
        hashedPassword,
        email
      ],
    );

    const { user } = await User.get(result.rows[0].id);

    return user;
  }

  /** Given a username, return data about user.
   *
   * Returns { username, email, games, groups }
   *   where games is Set { gameID, ... }
   *   and groups is Set { groupID, ... }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(userID) {
    const userRes = await db.query(
      `SELECT 
        u.id,
        u.username,
        u.email,
        u.image_url AS "imageURL",
        gc.game_id AS "gameID",
        ug.group_id AS "groupID"
      FROM users u
        LEFT JOIN game_collections gc
          ON gc.user_id = u.id
        LEFT JOIN users_groups ug
          ON ug.user_id = u.id
      WHERE u.id = $1`,
      [userID],
    );

    if (!userRes.rows[0]) throw new NotFoundError(`No user: ${userID}`);

    const {id,username,email,imageURL} = userRes.rows[0];

    const games = 
      (userRes.rows[0].gameID) 
        ? new Set(userRes.rows.map(r => r.gameID))
        : null;

    const groups = 
      (userRes.rows[0].groupID) 
        ? new Set(userRes.rows.map(r => r.groupID))
        : null;
    
    return {
      user: {
        id,
        username,
        email,
        imageURL,
        games,
        groups
      }
    };
  }
  /** Get all groups for a user. */
  static async getGroups(userID) {
    const results = await db.query(`
      SELECT 
        g.id,
        g.name,
        g.admin_user_id AS "adminUserID",
        g.image_url AS "imageURL"
      FROM groups g
      LEFT JOIN users_groups ug
        ON ug.user_id = $1
      ORDER BY g.name`,
      [userID],
    );
    return results.rows
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { username, password, email }
   *
   * Returns { id, username, email }
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    if (data.username) {
      const duplicateCheck = await db.query(
        `SELECT username
        FROM users
        WHERE username = $1`,
        [data.username],
      );
  
      if (duplicateCheck.rows[0]) {
        throw new BadRequestError(`Invalid username: ${username}`);
      }
    }

    const { setCols, values } = sqlForPartialUpdate(data, {
      imageURL: "image_url"
    });
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id,
                                username,
                                email,
                                image_url AS "imageURL"`;
    const result = await db.query(querySql, [...values, id]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${id}`);

    delete user.password;
    return user;
  }

  /** Delete given user from database; returns undefined.
   * 
   * Throws NotFoundError if not found.
   */

  static async remove(id) {
    let result = await db.query(
      `DELETE
        FROM users
        WHERE id = $1
        RETURNING id`,
      [id],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${id}`);
  }
}

module.exports = User;