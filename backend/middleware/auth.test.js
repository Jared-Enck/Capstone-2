"use strict";

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");
const {
  authenticateJWT,
  ensureLoggedIn,
  ensureOwner,
  ensureGroupAdmin
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
const testJwt = jwt.sign({ id: 1, username: "test" }, SECRET_KEY);
const badJwt = jwt.sign({ id: 1, username: "test" }, "wrong");


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
        id: 1,
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
    const res = { locals: { user: { id: 1, username: "test" } } };
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
    const req = { params: { userID: 1 } };
    const res = { locals: { user: { id: 1 } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureOwner(req, res, next);
  });

  it("throws unauth if not owner", () => {
    expect.assertions(1);
    const req = { params: { id: 1 } };
    const res = { locals: { user: { id: 2 } } };
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
      body: { adminUserID: 1 }
    };
    const res = { locals: { user: { id: 1 } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureGroupAdmin(req, res, next);
  });

  it("throws unauth if not group admin user", () => {
    expect.assertions(1);
    const req = { 
      params: { groupID: 1 },
      body: { adminUserID: 1 }
    };
    const res = { locals: { user: { id: 2 } } };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureGroupAdmin(req, res, next);
  });
});