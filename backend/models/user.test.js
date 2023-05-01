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
  getUsers
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** authenticate */

describe("authenticate", () => {
  it("works", async () => {
    const user = await User.authenticate("u1", "password1");
    expect(user).toEqual({
      username: "u1",
      email: "u1@email.com"
    });
  });

  it("throws unauth if no such user", async () => {
    try {
      await User.authenticate("nope", "password");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });

  it("throws unauth if wrong password", async () => {
    try {
      await User.authenticate("u1", "wrong");
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

/************************************** register */

describe("register", () => {
  const newUser = {
    username: "new",
    email: "it@it.com"
  };

  it("works", async () => {
    let user = await User.register({
      ...newUser,
      password: "password",
    });
    expect(user).toEqual({...newUser, id: user.id});
    const found = await db.query("SELECT * FROM users WHERE username = 'new'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  it("throws bad request with dup data", async () => {
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

describe("findAll", () => {
  it("works", async () => {
    const users = await User.findAll();
    expect(users).toEqual([
      {
        id: users[0].id,
        username: "u1",
        email: "u1@email.com"
      },
      { 
        id: users[1].id,
        username: "u2",
        email: "u2@email.com"
      },
      {
        id: users[2].id,
        username: "u3",
        email: "u3@email.com"
      }
    ]);
  });
});

/************************************** get */

describe("get", () => {
  it("works", async () => {
    const users = await User.findAll();

    let user = await User.get(users[0].id);
    expect(user).toEqual({
      username: "u1",
      email: "u1@email.com",
      games: ['e44jncYuUp']
    });
  });

  it("works if no games for user", async () => {
    const users = await User.findAll();

    let user = await User.get(users[2].id);
    expect(user).toEqual({
      username: "u3",
      email: "u3@email.com"
    });
  });

  it("throws not found if no such user", async () => {
    try {
      await User.get(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", () => {
  const updateData = {
    email: "new@email.com"
  };

  it("works", async () => {
    const users = await User.findAll();

    let res = await User.update(users[0].id, updateData);
    expect(res).toEqual({
      id: users[0].id,
      username: "u1",
      ...updateData,
    });
  });

  it("works: set password", async () => {
    const users = await User.findAll();

    let res = await User.update(users[0].id, {
      password: "new",
    });
    expect(res).toEqual({
      id: users[0].id,
      username: "u1",
      email: "u1@email.com"
    });
    const found = await db.query("SELECT * FROM users WHERE id = $1",[users[0].id]);
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  it("throws not found if no such user", async () => {
    try {
      await User.update(0, {
        username: "it",
      });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  it("throws bad request if no data", async () => {
    const users = await User.findAll();

    expect.assertions(1);
    try {
      await User.update(users[0].id, {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", () => {
  it("works", async () => {
    const users = await User.findAll();

    await User.remove(users[0].id);
    const res = await db.query(
        `SELECT * FROM users WHERE id=${users[0].id}`);
    expect(res.rows.length).toEqual(0);
  });

  it("throws not found if no such user", async () => {
    try {
      await User.remove(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});