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
   * Returns { username, email, is_admin }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/
  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
      `SELECT username,
              password,
              email,
              is_admin AS "isAdmin"
        FROM users
        WHERE username = $1`,
      [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, email, isAdmin }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register(
    { username, password, email, isAdmin }
  ) {
    const duplicateCheck = await db.query(
      `SELECT username
      FROM users
      WHERE username = $1`,
      [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
        (username,
        password,
        email,
        is_admin)
        VALUES ($1, $2, $3, $4)
        RETURNING username, email, is_admin AS "isAdmin"`,
      [
        username,
        hashedPassword,
        email,
        isAdmin,
      ],
    );

    const user = result.rows[0];

    return user;
  }

  /** Find all users.
   *
   * Returns [{ id, username, email, is_admin }, ...]
   **/

  static async findAll() {
    const results = await db.query(`
      SELECT 
        id,
        username,
        email,
        is_admin AS "isAdmin"
      FROM users
      ORDER BY username`,
    );
    return results.rows
  }

  /** Given a username, return data about user.
   *
   * Returns { username, is_admin, games }
   *   where games is { gameID, ... }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(userID) {
    const userRes = await db.query(
      `SELECT 
          u.id,
          u.username,
          u.email,
          u.is_admin AS "isAdmin",
          gc.game_id AS "gameID"
      FROM users u
        LEFT JOIN game_collections gc
          ON gc.user_id = u.id
      WHERE u.id = $1`,
      [userID],
    );

    if (!userRes.rows[0]) throw new NotFoundError(`No user: ${userID}`);

    const {username,email,isAdmin} = userRes.rows[0];

    const games = (userRes.rows[0].gameID) ? 
      userRes.rows.map(r => r.gameID) :
      false;

    const user = (games) ? 
      {
        username,
        email,
        isAdmin,
        games
      } :
      {
        username,
        email,
        isAdmin
      }
    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { username, password, email, isAdmin }
   *
   * Returns { id, username, email, isAdmin }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password or make a user an admin.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */

  static async update(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          isAdmin: "is_admin",
        });
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id,
                                username,
                                email,
                                is_admin AS "isAdmin"`;
    const result = await db.query(querySql, [...values, id]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${id}`);

    delete user.password;
    return user;
  }

  /** Delete given user from database; returns undefined. */

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