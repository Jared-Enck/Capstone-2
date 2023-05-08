"use strict";

const request = require("supertest");
const Group = require("../models/group")
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

/************************************** POST /groups */

describe("POST /groups", () => {
  const newGroup = {
    users: [
      {
        id: 1, 
        username: 'u1'
      },
      {
        id: 2, 
        username: 'u2'
      }
    ],
    name: "newGroup"
  }
  it("works", async () => {
    const resp = await request(app)
      .post("/groups")
      .send(newGroup)
      .set("authorization", u1Token);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      group: {
        id: expect.any(Number),
        name: "newGroup",
        adminUserID: 1,
        imageURL: expect.any(String)
      },
      msg: expect.any(String)
    });
  });

  it("throws bad request with missing fields", async () => {
    const resp = await request(app)
      .post("/groups")
      .send({
        users: [{id: 1, username: 'u1'}]
      })
      .set("authorization", u2Token);
    expect(resp.statusCode).toEqual(400);
  });

  it("throws bad request with invalid data", async () => {
    const resp = await request(app)
      .post("/groups")
      .send({
        users: [{id: '3', username: 'u3'}],
        name: "newGroup"
      })
      .set("authorization", u1Token);
    expect(resp.statusCode).toEqual(400);
  });

  it("throws bad request with duplicate name under current users groups", async () => {
    const resp = await request(app)
      .post("/groups")
      .send({
        users: [{id: 1, username: 'u1'}],
        name: "group1"
      })
      .set("authorization", u1Token);
    expect(resp.statusCode).toEqual(400);
  });

  it("throws unauth with anon user", async () => {
    const resp = await request(app)
      .post("/groups")
      .send({
        users: [{id: 3, username: 'u3'}],
        name: "newGroup"
      })
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** POST /groups/:groups */

describe("POST /groups/:groupID", () => {
  it("works", async () => {
    const resp = await request(app)
      .post("/groups/1")
      .send({users: [{id: 3, username: 'u3'}]})
      .set("authorization", u1Token);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual(
      expect.any(String)
    );
  });
});