"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const User = require("./user.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** authenticate */

describe("authenticate", function () {
  it("works", async function () {
    const user = await User.authenticate("u1", "password1");
    expect(user).toEqual({
      username: "u1",
      email: "u1@email.com",
      isAdmin: false,
    });
  });

  it("unauth if no such user", async function () {
    try {
      await User.authenticate("nope", "password");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });

  it("unauth if wrong password", async function () {
    try {
      await User.authenticate("u1", "wrong");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

/************************************** register */

describe("register", function () {
  const newUser = {
    username: "new",
    email: "it@it.com",
    isAdmin: false,
  };

  it("works", async function () {
    let user = await User.register({
      ...newUser,
      password: "password",
    });
    expect(user).toEqual(newUser);
    const found = await db.query("SELECT * FROM users WHERE username = 'new'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].is_admin).toEqual(false);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  it("works: adds admin", async function () {
    let user = await User.register({
      ...newUser,
      password: "password",
      isAdmin: true,
    });
    expect(user).toEqual({ ...newUser, isAdmin: true });
    const found = await db.query("SELECT * FROM users WHERE username = 'new'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].is_admin).toEqual(true);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  it("bad request with dup data", async function () {
    try {
      await User.register({
        ...newUser,
        password: "password",
      });
      await User.register({
        ...newUser,
        password: "password",
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** findAll */

describe("findAll", function () {
  it("works", async function () {
    const users = await User.findAll();
    expect(users).toEqual([
      {
        id: 1,
        username: "u1",
        email: "u1@email.com",
        isAdmin: false
      },
      { 
        id: 2,
        username: "u2",
        email: "u2@email.com",
        isAdmin: false
      },
      {
        id: 3,
        username: "u3",
        email: "u3@email.com",
        isAdmin: false
      }
    ]);
  });
});

/************************************** get */

describe("get", function () {
  it("works", async function () {
    let user = await User.get(1);
    expect(user).toEqual({
      username: "u1",
      email: "u1@email.com",
      isAdmin: false,
      games: ['e44jncYuUp']
    });
  });

  it("works if no games for user", async function () {
    let user = await User.get(3);
    expect(user).toEqual({
      username: "u3",
      email: "u3@email.com",
      isAdmin: false
    });
  });

  it("not found if no such user", async function () {
    try {
      await User.get(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  const updateData = {
    email: "new@email.com",
    isAdmin: true,
  };

  it("works", async function () {
    let res = await User.update(1, updateData);
    expect(res).toEqual({
      id: 1,
      username: "u1",
      ...updateData,
    });
  });

  it("works: set password", async function () {
    let res = await User.update(1, {
      password: "new",
    });
    expect(res).toEqual({
      id: 1,
      username: "u1",
      email: "u1@email.com",
      isAdmin: false,
    });
    const found = await db.query("SELECT * FROM users WHERE id = 1");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  it("throws not found if no such user", async function () {
    try {
      await User.update(0, {
        username: "it",
      });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  it("throws bad request if no data", async function () {
    expect.assertions(1);
    try {
      await User.update(1, {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  it("works", async function () {
    await User.remove(1);
    const res = await db.query(
        "SELECT * FROM users WHERE id=1");
    expect(res.rows.length).toEqual(0);
  });

  it("not found if no such user", async function () {
    try {
      await User.remove(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});