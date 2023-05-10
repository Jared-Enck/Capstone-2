"use strict";

const db = require("../db");
const addUsersSorter = require('../helpers/addUsersSorter')
const sqlForPartialUpdate = require('../helpers/sql')
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

    const justCreated = true;

    const { msg } = await Group.addUsers(
      {
        groupID: group.id, 
        users
      }, 
      justCreated
    );

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
    
    const users = usersRes.rows;
    if (!users.length) throw new NotFoundError(`No group: ${groupID}`);

    return users;
  }

  /** Add users to a group with groupID and userIDs array
   * 
   * Returns { id, name }
   * 
   **/

  static async addUsers({groupID, users}, justCreated = false) {
    const {sqlVals, userIDs, usernames} = addUsersSorter(users);

    if (!justCreated) {
      const groupExists = await db.query(`
        SELECT id 
        FROM groups
        WHERE id = $1
      `,[groupID])

      if (!groupExists.rows[0]) throw new NotFoundError(`No group: ${groupID}`);
    }

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

  /** Update group data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { name, imageURL }
   *
   * Returns { id, name, imageURL }
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    // if (data.name) {
    //   const {name} = data;
    //   const lowerName = name.toLowerCase();
    //   const duplicateCheck = await db.query(
    //     `SELECT g.name
    //     FROM groups g
    //       LEFT JOIN users_groups ug
    //         ON ug.user_id = $2
    //     WHERE lower(g.name) = $1`,
    //     [lowerName, adminUserID],
    //   );

    //   if (duplicateCheck.rows[0]) {
    //     throw new BadRequestError(`Duplicate group: ${name}`);
    //   }
    // }
    const { setCols, values } = sqlForPartialUpdate(data, {
      imageURL: "image_url"
    });
    const idVarIdx = "$" + (values.length + 1);
    const querySql = `UPDATE groups 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id,
                                name,
                                image_url AS "imageURL"
    `;

    const result = await db.query(querySql, [...values, id]);
    const group = result.rows[0];
    if (!group) throw new NotFoundError(`No group: ${id}`);

    return group;
  }

  /** Delete given group from database; returns undefined.
   * 
   * Throws NotFoundError if not found.
   */

  static async delete(groupID) {
    let result = await db.query(
      `DELETE
        FROM groups
        WHERE id = $1
        RETURNING id`,
      [groupID],
    );
    const group = result.rows[0];

    if (!group) throw new NotFoundError(`No group: ${groupID}`);
  }

  /** Allows a user to leave a group.
   * 
   * Returns { id, name }
   */

  static async leave(groupID,userID) {
    const result = await db.query(`
      DELETE FROM users_groups
      WHERE group_id = $1 AND user_id = $2
      RETURNING group_id AS "groupID"`
      ,[groupID,userID]);
    
    const group = result.rows[0];

    if (!group) throw new NotFoundError(`No group: ${groupID}`);
  }
}

module.exports = Group