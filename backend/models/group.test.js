"use strict";

const db = require("../db.js");
const { 
  BadRequestError,
  NotFoundError
} = require("../expressError.js")
const User = require("./user.js");
const Group = require("./group.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  it("works", async function () {
    const usersRes = await User.findAll();
    const u1 = usersRes[0];

    const newGroup = {
      userIDs: [u1.id],
      name: "New",
      adminUserID: u1.id
    };

    let group = await Group.create(newGroup);
    delete newGroup.userIDs;

    expect(group).toEqual({...newGroup, id: group.id});

    const result = await db.query(
          `SELECT id, name, admin_user_id AS "adminUserID"
           FROM groups
           WHERE id = ${group.id}`);
           
    expect(result.rows).toEqual([
      {
        id: group.id,
        name: "New",
        adminUserID: group.adminUserID
      },
    ]);
  });

  it("works with multiple users assigned at creation.", async function () {
    const usersRes = await User.findAll();
    const u1 = usersRes[0];
    const u2 = usersRes[1];
    const u3 = usersRes[2];

    const newGroup2 = {
      userIDs: [u1.id,u2.id,u3.id],
      name: "New2",
      adminUserID: u2.id
    };

    let group = await Group.create(newGroup2);
    delete newGroup2.userIDs;

    expect(group).toEqual({...newGroup2, id: group.id});

    const result = await db.query(
          `SELECT id, name, admin_user_id AS "adminUserID"
           FROM groups
           WHERE id = $1`,[group.id]);

    expect(result.rows).toEqual([
      {
        id: group.id,
        name: "New2",
        adminUserID: u2.id
      },
    ]);

    let groupUsers = await db.query(
      `SELECT
          u.id,
          u.username
        FROM users u
          LEFT JOIN users_groups ug
            ON ug.user_id = u.id
        WHERE ug.group_id = $1
      `,[group.id]);
    
    expect(groupUsers.rows).toEqual([
      {
        id: u1.id,
        username: 'u1'
      },
      {
        id: u2.id,
        username: 'u2'
      },
      {
        id: u3.id,
        username: 'u3'
      }
    ]);
  });

  it("throws bad request with dupe", async function () {
    const usersRes = await User.findAll();
    const u1 = usersRes[0];

    const newGroup = {
      userIDs: [u1.id],
      name: "New",
      adminUserID: u1.id
    };

    try {
      await Group.create(newGroup);
      await Group.create(newGroup);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** getUsers */
describe("getUsers", function () {
  it("works", async function () {
    const usersRes = await User.findAll();
    const u1 = usersRes[0];
    const u2 = usersRes[1];

    const newGroup = {
      userIDs: [u1.id,u2.id],
      name: "New",
      adminUserID: u1.id
    };

    const group = await Group.create(newGroup);

    let users = await Group.getUsers(group.id);

    expect(users).toEqual([
      {
        id: u1.id,
        username: 'u1'
      },
      {
        id: u2.id,
        username: 'u2'
      }
    ]);
  });
});