"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("../_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /auth/token */

describe("POST /auth/token", () => {
  it("works", async () => {
    const resp = await request(app)
        .post("/auth/token")
        .send({
          username: "u1",
          password: "password1",
        });
    expect(resp.body).toEqual({
      "token": expect.any(String),
      "user": expect.any(Object)
    });
  });

  it("throws unauth with non-existent user", async () => {
    const resp = await request(app)
        .post("/auth/token")
        .send({
          username: "no-such-user",
          password: "password1",
        });
    expect(resp.statusCode).toEqual(401);
  });

  it("throws unauth with wrong password", async () => {
    const resp = await request(app)
        .post("/auth/token")
        .send({
          username: "u1",
          password: "nope",
        });
    expect(resp.statusCode).toEqual(401);
  });

  it("throws bad request with missing data", async () => {
    const resp = await request(app)
        .post("/auth/token")
        .send({
          username: "u1",
        });
    expect(resp.statusCode).toEqual(400);
  });

  it("throws bad request with invalid data", async () => {
    const resp = await request(app)
        .post("/auth/token")
        .send({
          username: 42,
          password: "above-is-a-number",
        });
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** POST /auth/register */

describe("POST /auth/register", () => {
  it("works for anon", async () => {
    const resp = await request(app)
      .post("/auth/register")
      .send({
        username: "new",
        password: "password",
        email: "new@email.com",
      });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      "token": expect.any(String),
      "user": expect.any(Object)
    });
  });

  it("throws bad request with missing fields", async () => {
    const resp = await request(app)
        .post("/auth/register")
        .send({
          username: "new",
        });
    expect(resp.statusCode).toEqual(400);
  });

  it("throws bad request with invalid data", async () => {
    const resp = await request(app)
        .post("/auth/register")
        .send({
          username: "new",
          password: "password",
          email: "not-an-email",
        });
    expect(resp.statusCode).toEqual(400);
  });

  it("throws bad request with duplicate username", async () => {
    const resp = await request(app)
        .post("/auth/register")
        .send({
          username: "u1",
          password: "password",
          email: "new@email.com",
        });
    expect(resp.statusCode).toEqual(400);
  });

  it("throws bad request with duplicate email", async () => {
    const resp = await request(app)
        .post("/auth/register")
        .send({
          username: "new",
          password: "password",
          email: "u1@email.com",
        });
    expect(resp.statusCode).toEqual(400);
  });
});