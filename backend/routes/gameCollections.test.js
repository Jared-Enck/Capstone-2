"use strict";

const request = require("supertest");
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

/************************************** POST /gameCollections/:userID */

describe("POST /gameCollections/:userID", () => {
  const addGameObj = {
    id: "78ZDzlpvdb",
    name: "Moonrakers"
  }
  it("works for owner", async () => {
    const resp = await request(app)
      .post("/gameCollections/1")
      .send(addGameObj)
      .set("authorization", u1Token);
    expect(resp.body).toEqual({
      msg: `Moonrakers has been added to your collection.`
    })
  });

  it("throws unauth for not owner", async function () {
    const resp = await request(app)
      .post("/gameCollections/1")
      .send(addGameObj)
      .set("authorization", u2Token);
    expect(resp.statusCode).toEqual(401);
  });

  it("throws unauth with anon user", async () => {
    const resp = await request(app)
      .post("/gameCollections/1")
      .send(addGameObj);
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** DELETE /gameCollections/:userID */

describe("DELETE /gameCollections/:userID", () => {
  const removeGameObj = {
    id: "nSZTnbgacm",
    name: "Dinosaur Island"
  }
  it("works for owner", async () => {
    const resp = await request(app)
      .delete("/gameCollections/1")
      .send(removeGameObj)
      .set("authorization", u1Token);
    expect(resp.body).toEqual({
      msg: `Dinosaur Island has been removed from your collection.`
    })
  });

  it("throws unauth for not owner", async function () {
    const resp = await request(app)
      .delete("/gameCollections/1")
      .send(removeGameObj)
      .set("authorization", u2Token);
    expect(resp.statusCode).toEqual(401);
  });

  it("throws unauth with anon user", async () => {
    const resp = await request(app)
      .delete("/gameCollections/1")
      .send(removeGameObj);
    expect(resp.statusCode).toEqual(401);
  });
});