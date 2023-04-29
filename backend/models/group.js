"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

/** Related functions for groups. */

class Group {
  /** Create group with name under userID
   * 
   * Returns { id, name }
   * 
   * Throws BadRequestError on duplicates.
   **/
  static async create(newGroup) {
    const { userIDs, name, adminUserID } = newGroup;

    const lowerName = name.toLowerCase();
    const duplicateCheck = await db.query(
      `SELECT g.name
      FROM groups g
        LEFT JOIN users_groups ug
          ON ug.user_id = $2
      WHERE lower(g.name) = $1`,
      [lowerName, adminUserID],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate group: ${name}`);
    }

    const groupRes = await db.query(
      `INSERT INTO groups
        (name, admin_user_id)
        VALUES ($1, $2)
        RETURNING id, name, admin_user_id AS "adminUserID"`,
      [ name, adminUserID ],
    );
    
    const group = groupRes.rows[0];

    await this.addUsers(group.id, userIDs)

    return group;
  }

  /** Get a group's users with groupID
   * 
   * Returns { id, name }
   **/

  static async getUsers(groupID) {
    const usersRes = await db.query(
      `SELECT
        u.id,
        u.username
      FROM users u
        LEFT JOIN users_groups ug
          ON ug.user_id = u.id
      WHERE ug.group_id = $1`,
      [groupID]
    ); 
    
    return usersRes.rows;
  }

  /** Add a user to the group with userID
   * 
   * Returns { id, name }
   * 
   * Throws NotFoundError if can't userID.
   **/

  static async addUsers(groupID, userIDs) {
    const groupIDVarIdx = "$" + (userIDs.length + 1);

    const vals = userIDs.map((u,idx) => `(${groupIDVarIdx}, $${idx + 1})`);

    const querySql = 
      `INSERT INTO users_groups
          (group_id, user_id)
        VALUES
          ${vals.join(',')}
        RETURNING user_id AS "userID"
        `;

    const addUsers = await db.query(querySql,[...userIDs, groupID]);

    return addUsers;
  }
}

module.exports = Group