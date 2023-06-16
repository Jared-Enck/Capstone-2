"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const sqlForPartialUpdate = require("../helpers/sql");
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
        username,
        password
      FROM users
      WHERE username = $1`,
      [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password
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
    const duplicateUsernameCheck = await db.query(
      `SELECT username
      FROM users
      WHERE username = $1`,
      [username],
    );
    const duplicateEmailCheck = await db.query(
      `SELECT email
      FROM users
      WHERE email = $1`,
      [email],
    );
    if (duplicateUsernameCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    if (duplicateEmailCheck.rows[0]) {
      throw new BadRequestError(`Duplicate email: ${email}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
        (username, password, email)
      VALUES ($1, $2, $3)
      RETURNING username`,
      [
        username,
        hashedPassword,
        email
      ],
    );

    const user = result.rows[0];

    return user;
  }

  /** Given a username, return data about user.
   *
   * Returns { username, email, imageUrl }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(reqUsername) {
    const userRes = await db.query(
      `SELECT 
        username,
        email,
        image_url AS "imageURL"
      FROM users
      WHERE username = $1`,
      [reqUsername],
    );

    if (!userRes.rows[0]) throw new NotFoundError(`No user: ${reqUsername}`);

    const user = userRes.rows[0];

    return { user };
  }

  /** Get all groups for a user. */
  static async getGroups(username) {
    const results = await db.query(`
      SELECT 
        g.id,
        g.name,
        g.admin_username AS "adminUserID",
        g.image_url AS "imageURL"
      FROM groups g
      LEFT JOIN users_groups ug
        ON ug.username = $1
      ORDER BY g.name`,
      [username],
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
   * Returns { username, email }
   *
   * Throws NotFoundError if not found.
   */

  static async update(username, data) {
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
                      WHERE username = ${idVarIdx} 
                      RETURNING username,
                                email,
                                image_url AS "imageURL"`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }

  /** Delete given user from database; returns undefined.
   * 
   * Throws NotFoundError if not found.
   */

  static async remove(username) {
    let result = await db.query(
      `DELETE FROM users
        WHERE username = $1
        RETURNING username`,
      [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }
}

module.exports = User;