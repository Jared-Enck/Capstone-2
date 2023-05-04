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
  commonAfterAll
} = require("../_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** authenticate */

describe("authenticate", () => {
  it("works", async () => {
    const user = await User.authenticate("u1", "password1");
    expect(user).toEqual({
      id: 1,
      username: "u1",
      email: "u1@email.com",
      imageURL: user.imageURL,
      games: expect.any(Set),
      groups: expect.any(Set)
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
    expect(user).toEqual({
      ...newUser, 
      id: user.id,
      games: null,
      groups: null,
      imageURL: user.imageURL
    });
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

/************************************** get */

describe("get", () => {
  it("works", async () => {
    let { user } = await User.get(1);

    expect(user).toEqual({
      id: 1,
      username: "u1",
      email: "u1@email.com",
      imageURL: user.imageURL,
      games: expect.any(Set),
      groups: expect.any(Set)
    });
  });

  it("works if no games or groups for user", async () => {  
    let { user } = await User.get(3);

    expect(user).toEqual({
      id: 3,
      username: "u3",
      email: "u3@email.com",
      imageURL: user.imageURL,
      games: null,
      groups: null
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
    let res = await User.update(1, updateData);
    expect(res).toEqual({
      id: 1,
      username: "u1",
      email: "new@email.com",
      imageURL: res.imageURL
    });
  });

  it("works: set password", async () => {
    let res = await User.update(1, {
      password: "new",
    });
    expect(res).toEqual({
      id: 1,
      username: "u1",
      email: "u1@email.com",
      imageURL: res.imageURL
    });
    const found = await db.query("SELECT * FROM users WHERE id = $1",[1]);
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

describe("remove", () => {
  it("works", async () => {
    await User.remove(1);
    const res = await db.query(
        `SELECT * FROM users WHERE id=1`);
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