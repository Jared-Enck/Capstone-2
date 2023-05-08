"use strict";

const db = require("../db");
const addUsersSorter = require('../helpers/addUsersSorter')
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

/** Related functions for groups. */

class Group {
  /** Create group with name and array of userIDs
   * 
   * adds each userID to the users_groups table
   * 
   * Returns { id, name, users, adminUserID, imageURL }
   *  where users = [userID, ...]
   * 
   * Throws BadRequestError on duplicates.
   **/
  static async create(newGroup) {
    if (!newGroup) {
      throw new BadRequestError(`Invalid data: ${newGroup}`);
    }
    const { users, name, adminUserID = users[0].id } = newGroup;

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
      VALUES 
        ($1, $2)
      RETURNING 
        id, 
        name, 
        admin_user_id AS "adminUserID", 
        image_url AS "imageURL"`,
      [ name, adminUserID ],
    );
    
    const group = groupRes.rows[0];

    const { msg } = await Group.addUsers({groupID: group.id, users})

    return {
      group,
      msg
    };
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

  /** Add users to a group with groupID and userIDs array
   * 
   * Returns { id, name }
   * 
   * Throws NotFoundError if can't userID.
   **/

  static async addUsers({groupID, users}) {
    const {sqlVals, userIDs, usernames} = addUsersSorter(users);

    const querySql = 
      `INSERT INTO users_groups
          (group_id, user_id)
        VALUES
          ${sqlVals.join(',')}`;

    await db.query(querySql,[...userIDs, groupID]);

    return {
      msg: `${usernames.join(', ')} were added to the group.`
    };
  }

  /** Allows a user to leave a group.
   * 
   * Returns { id, name }
   */

  static async leave(groupID,userID) {
    return await db.query(`
      DELETE FROM users_groups
      WHERE group_id = $1 AND user_id = $2
      RETURNING user_id AS "userID"`
      ,[groupID,userID]);
  }
}

module.exports = Group