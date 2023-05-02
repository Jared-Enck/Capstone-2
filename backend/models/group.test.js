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
describe("create", () => {
  it("works", async () => {
    const usersRes = await User.findAll();
    const u1 = usersRes[0];

    const newGroup = {
      userIDs: [u1.id],
      name: "New",
      adminUserID: u1.id,
    };

    let group = await Group.create(newGroup);
    delete newGroup.userIDs;

    expect(group).toEqual({
      ...newGroup, 
      id: group.id,
      imageURL: group.imageURL,
      users: [...group.users]
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
        adminUserID: group.adminUserID,
        imageURL: group.imageURL
      },
    ]);
  });

  it("works with multiple users assigned at creation.", async () => {
    const usersRes = await User.findAll();
    const u1 = usersRes[0];
    const u2 = usersRes[1];
    const u3 = usersRes[2];

    const newGroup2 = {
      userIDs: [u1.id,u2.id,u3.id],
      name: "New2",
      adminUserID: u2.id
    };

    let group2 = await Group.create(newGroup2);
    delete newGroup2.userIDs;

    expect(group2).toEqual({
      ...newGroup2, 
      id: group2.id,
      imageURL: group2.imageURL,
      users: [...group2.users]
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
        adminUserID: u2.id,
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

  it("throws bad request with dupe", async () => {
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
describe("getUsers", () => {
  it("works", async () => {
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

/************************************** addUsers */
describe("addUsers", () => {
  it("works", async () => {
    const usersRes = await User.findAll();
    const u1 = usersRes[0];
    const u2 = usersRes[1];
    const u3 = usersRes[2]

    const newGroup = {
      userIDs: [u1.id,u2.id],
      name: "New",
      adminUserID: u1.id
    };

    const group = await Group.create(newGroup);

    let groupUsers1 = await Group.getUsers(group.id);
    expect(groupUsers1).toEqual([
      {
        id: u1.id,
        username: 'u1'
      },
      {
        id: u2.id,
        username: 'u2'
      }
    ]);

    await Group.addUsers(group.id,[u3.id]);

    let newGroupUsers = await Group.getUsers(group.id);
    expect(newGroupUsers).toEqual([
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
});

/************************************** leave */
describe("leave", () => {
  it("works", async () => {
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

    await Group.leave(group.id,u2.id);

    let updatedUsers = await Group.getUsers(group.id);

    expect(updatedUsers).toEqual([
      {
        id: u1.id,
        username: 'u1'
      }
    ]);
  });
});