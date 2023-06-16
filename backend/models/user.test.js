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
      username: "u1",
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
      username: "new"
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
    let { user } = await User.get('u1');

    expect(user).toEqual({
      username: "u1",
      email: "u1@email.com",
      imageURL: user.imageURL
    });
  });

  it("works if no games or groups for user", async () => {  
    let { user } = await User.get('u3');

    expect(user).toEqual({
      username: "u3",
      email: "u3@email.com",
      imageURL: user.imageURL
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
    let res = await User.update('u1', updateData);
    expect(res).toEqual({
      username: "u1",
      email: "new@email.com",
      imageURL: res.imageURL
    });
  });

  it("works: set password", async () => {
    let res = await User.update('u1', {
      password: "new",
    });
    expect(res).toEqual({
      username: "u1",
      email: "u1@email.com",
      imageURL: res.imageURL
    });
    const found = await db.query("SELECT * FROM users WHERE username = $1",['u1']);
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  it("throws not found if no such user", async () => {
    try {
      await User.update('nope', {
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
      await User.update('u1', {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", () => {
  it("works", async () => {
    await User.remove('u1');
    const res = await db.query(
        `SELECT * FROM users WHERE username = 'u1'`);
    expect(res.rows.length).toEqual(0);
  });

  it("throws not found if no such user", async () => {
    try {
      await User.remove('nope');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});