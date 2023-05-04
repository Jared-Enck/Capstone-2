"use strict";

const db = require("../db.js");
const { 
  BadRequestError
} = require("../expressError.js")
const Group = require("./group.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
} = require("../_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */
describe("create", () => {
  it("works", async () => {
    const newGroup = {
      userIDs: [1],
      name: "New",
      adminUserID: 1,
    };

    let group = await Group.create(newGroup);
    delete newGroup.userIDs;

    expect(group).toEqual({
      ...newGroup, 
      id: group.id,
      imageURL: group.imageURL,
      users: [1]
    });

    const result = await db.query(
      `SELECT 
        id, 
        name, 
        admin_user_id AS "adminUserID",
        image_url AS "imageURL"
      FROM groups
      WHERE id = $1`,
      [group.id]
    );
           
    expect(result.rows).toEqual([
      {
        id: group.id,
        name: "New",
        adminUserID: 1,
        imageURL: group.imageURL
      },
    ]);
  });

  it("works with multiple users assigned at creation.", async () => {
    const newGroup2 = {
      userIDs: [1,2,3],
      name: "New2",
      adminUserID: 2
    };

    let group2 = await Group.create(newGroup2);
    delete newGroup2.userIDs;

    expect(group2).toEqual({
      ...newGroup2, 
      id: group2.id,
      imageURL: group2.imageURL,
      users: [1,2,3]
    });

    const result = await db.query(
      `SELECT 
        id, 
        name, 
        admin_user_id AS "adminUserID",
        image_url AS "imageURL"
      FROM groups
      WHERE id = $1`,
      [group2.id]
    );

    expect(result.rows).toEqual([
      {
        id: group2.id,
        name: "New2",
        adminUserID: 2,
        imageURL: group2.imageURL
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
      `,[group2.id]);
    
    expect(groupUsers.rows).toEqual([
      {
        id: 1,
        username: 'u1'
      },
      {
        id: 2,
        username: 'u2'
      },
      {
        id: 3,
        username: 'u3'
      }
    ]);
  });

  it("throws bad request with dupe", async () => {
    const newGroup = {
      userIDs: [1],
      name: "New",
      adminUserID: 1
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
describe("getUsers", () => {
  it("works", async () => {
    let users = await Group.getUsers(1);

    expect(users).toEqual([
      {
        id: 1,
        username: 'u1'
      },
      {
        id: 2,
        username: 'u2'
      }
    ]);
  });
});

/************************************** addUsers */
describe("addUsers", () => {
  it("works", async () => {
    let groupUsers1 = await Group.getUsers(1);

    expect(groupUsers1).toEqual([
      {
        id: 1,
        username: 'u1'
      },
      {
        id: 2,
        username: 'u2'
      }
    ]);

    await Group.addUsers(1,[3]);

    let newGroupUsers = await Group.getUsers(1);
    expect(newGroupUsers).toEqual([
      {
        id: 1,
        username: 'u1'
      },
      {
        id: 2,
        username: 'u2'
      },
      {
        id: 3,
        username: 'u3'
      }
    ]);
  });
});

/************************************** leave */
describe("leave", () => {
  it("works", async () => {1
    let users = await Group.getUsers(1);

    expect(users).toEqual([
      {
        id: 1,
        username: 'u1'
      },
      {
        id: 2,
        username: 'u2'
      }
    ]);

    await Group.leave(1,2);

    let updatedUsers = await Group.getUsers(1);

    expect(updatedUsers).toEqual([
      {
        id: 1,
        username: 'u1'
      }
    ]);
  });
});