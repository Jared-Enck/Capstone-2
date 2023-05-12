"use strict";

const request = require("supertest");
const User = require("../models/user")
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token
} = require("../_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** PATCH /users/:userID */

describe("PATCH /users/:username", () => {
  it("works for owner user", async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        username: "NewU1"
      })
      .set("authorization", u1Token);
    expect(resp.body).toEqual({
      user: {
        username: "NewU1",
        email: "u1@email.com",
        imageURL: expect.any(String)
      }
    });
  });

  it("throws unauth for not owner", async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        username: "NewU1"
      })
      .set("authorization", u2Token);
    expect(resp.statusCode).toEqual(401);
  });

  test("throws unauth for anon", async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        username: "NewU1"
      });
    expect(resp.statusCode).toEqual(401);
  });

  it("throws bad request if invalid data", async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        username: 42,
      })
      .set("authorization", u1Token);
    expect(resp.statusCode).toEqual(400);
  });

  test("works: set new password", async function () {
    const resp = await request(app)
        .patch(`/users/u1`)
        .send({
          password: "new-password",
        })
        .set("authorization", u1Token);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        email: "u1@email.com",
        imageURL: expect.any(String)
      }
    });
    const isSuccessful = await User.authenticate("u1", "new-password");
    expect(isSuccessful).toBeTruthy();
  });
});

/************************************** DELETE /users/:username */

describe("DELETE /users/:username", function () {
  it("works for owner user", async function () {
    const resp = await request(app)
      .delete(`/users/u2`)
      .set("authorization", u2Token);
    expect(resp.body).toEqual({ deleted: 'u2' });
  });

  it("throws unauth for not owner", async function () {
    const resp = await request(app)
      .delete(`/users/u1`)
      .set("authorization", u2Token);
    expect(resp.statusCode).toEqual(401);
  });

  it("throws unauth for anon user", async function () {
    const resp = await request(app)
      .delete(`/users/u1`)
    expect(resp.statusCode).toEqual(401);
  });
});

