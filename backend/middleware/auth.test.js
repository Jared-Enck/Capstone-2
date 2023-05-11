"use strict";

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");
const {
  authenticateJWT,
  ensureLoggedIn,
  ensureOwner,
  ensureGroupAdmin,
  ensureGroupUser
} = require("./auth");

const {
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
} = require("../_testCommon");

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const { SECRET_KEY } = require("../config");
const testJwt = jwt.sign({ username: "test" }, SECRET_KEY);
const badJwt = jwt.sign({ username: "test" }, "wrong");


describe("authenticateJWT", () => {
  it("works: via header", () => {
    expect.assertions(2);

    const req = { headers: { authorization: testJwt } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        username: "test"
      },
    });
  });

  it("works: no header", () => {
    expect.assertions(2);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });

  it("works: invalid token", () => {
    expect.assertions(2);
    const req = { headers: { authorization: badJwt } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });
});


describe("ensureLoggedIn", () => {
  it("works", () => {
    expect.assertions(1);
    const req = {};
    const res = { locals: { user: { username: "test" } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureLoggedIn(req, res, next);
  });

  it("throws unauth if no login", () => {
    expect.assertions(1);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureLoggedIn(req, res, next);
  });
});

describe("ensureOwner", () => {
  it("works for owner", () => {
    expect.assertions(1);
    const req = { params: { username: 'u1' } };
    const res = { locals: { user: { username: 'u1' } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureOwner(req, res, next);
  });

  it("throws unauth if not owner", () => {
    expect.assertions(1);
    const req = { params: { username: 'u1' } };
    const res = { locals: { user: { username: 'u2' } } };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureOwner(req, res, next);
  });
});

describe("ensureGroupAdmin", () => {
  it("works for group admin user", () => {
    expect.assertions(1);
    const req = { 
      params: { groupID: 1 },
      body: { adminUsername: 'u1' }
    };
    const res = { locals: { user: { username: 'u1' } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureGroupAdmin(req, res, next);
  });

  it("throws unauth if not group admin user", () => {
    expect.assertions(1);
    const req = { 
      params: { groupID: 1 },
      body: { adminUsername: 'u1' }
    };
    const res = { locals: { user: { username: 'u2' } } };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureGroupAdmin(req, res, next);
  });
});

describe("ensureGroupUser", () => {
  it("works for group user", () => {
    expect.assertions(1);
    const req = { 
      params: { groupID: 1 },
      body: { groupUsers: ['u1','u2'] }
    };
    const res = { locals: { user: { username: 'u1' } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureGroupUser(req, res, next);
  });

  it("throws unauth if not group user", () => {
    expect.assertions(1);
    const req = { 
      params: { groupID: 1 },
      body: { groupUsers: ['u1','u2'] }
    };
    const res = { locals: { user: { username: 'u3' } } };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureGroupUser(req, res, next);
  });
});