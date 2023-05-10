"use strict";

const db = require("../db.js");
const { 
  BadRequestError,
  NotFoundError
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
  const userArr = [
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
  ];
  it("works", async () => {
    const newGroup = {
      users: [userArr[0]],
      name: "New",
      adminUserID: 1,
    };

    let res = await Group.create(newGroup);

    expect(res).toEqual({
      group: {
        id: expect.any(Number),
        name: "New",
        adminUserID: 1, 
        imageURL: expect.any(String)
      },
      msg: expect.any(String)
    });
  });

  it("works with multiple users assigned at creation.", async () => {
    const newGroup2 = {
      users: [...userArr],
      name: "New2",
      adminUserID: 2
    };

    let res = await Group.create(newGroup2);

    expect(res).toEqual({
      group: {
        id: expect.any(Number),
        name: "New2",
        adminUserID: 2, 
        imageURL: expect.any(String)
      },
      msg: expect.any(String)
    });

    let groupUsers = await Group.getUsers(res.group.id)
    
    expect(groupUsers).toEqual([
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
      users: [{id: 1, username: 'u1'}],
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

  it("throws not found if no such group", async () => {
    try {
      await Group.getUsers(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
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

    await Group.addUsers({groupID: 1, users: [{id: 3, username: 'u3'}]});

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

  it("throws not found if no such group", async () => {
    try {
      await Group.addUsers({groupID: 0, users: [{id: 3, username: 'u3'}]});
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", () => {
  const updateData = {
    name: "newGroupName"
  };

  it("works", async () => {
    let res = await Group.update(1, updateData);
    expect(res).toEqual({
      id: 1,
      name: "newGroupName",
      imageURL: expect.any(String)
    });
  });

  it("throws not found if no such group", async () => {
    try {
      await Group.update(0, {
        name: "it",
      });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  it("throws bad request if no data", async () => {
    expect.assertions(1);
    try {
      await Group.update(1, {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});
/************************************** remove */

describe("delete", () => {
  it("works", async () => {
    await Group.delete(1);
    const res = await db.query(
      `SELECT * FROM groups WHERE id=1`);
    expect(res.rows.length).toEqual(0);
  });

  it("throws not found if no such group", async () => {
    try {
      await Group.delete(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
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
  
  it("throws not found if no such group", async () => {
    try {
      await Group.leave(0,2);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});