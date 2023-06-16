"use strict";
const User = require("./user");
const GameCollection = require("./gameCollection.js");
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

/************************************** getGames */

describe("getGames", () => {
  it("works", async () => {
    const games = await GameCollection.getGames('u1');

    expect(games.size).toEqual(2);
    expect(games.has("e44jncYuUp")).toBe(true);
    expect(games.has("nSZTnbgacm")).toBe(true);
  });
});

/************************************** addGame */

describe("addGame", () => {
  const addGameObj = {
    username: 'u1',
    game: {
      id: "78ZDzlpvdb",
      name: "Moonrakers"
    }
  };
  it("works", async () => {
    const res = await GameCollection.addGame(addGameObj);

    const games = await GameCollection.getGames('u1');

    expect(games.has("78ZDzlpvdb")).toBe(true);
    expect(res).toEqual({
      msg: `Moonrakers has been added to your collection.`
    });
  });
});

/************************************** removeGame */

describe("removeGame", () => {
  const removeGameObj = {
    username: 'u1',
    game: {
      id: "nSZTnbgacm",
      name: "Dinosaur Island"
    }
  }

  it("works", async () => {
    const games = await GameCollection.getGames('u1');

    expect(games.has("nSZTnbgacm")).toBe(true);

    const res = await GameCollection.removeGame(removeGameObj);

    const updatedGames = await GameCollection.getGames('u1');

    expect(updatedGames.has("nSZTnbgacm")).toBe(false);
    expect(res).toEqual({
      msg: `Dinosaur Island has been removed from your collection.`
    });
  });
});