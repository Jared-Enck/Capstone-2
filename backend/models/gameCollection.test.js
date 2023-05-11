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
    const {user} = await User.get('u1');

    expect(user.games.has("78ZDzlpvdb")).toBe(false);

    const res = await GameCollection.addGame(addGameObj);

    const updatedUser = (await User.get('u1')).user;

    expect(updatedUser.games.has("78ZDzlpvdb")).toBe(true);
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
    const {user} = await User.get('u1');

    expect(user.games.has("nSZTnbgacm")).toBe(true);

    const res = await GameCollection.removeGame(removeGameObj);

    const updatedUser = (await User.get('u1')).user;

    expect(updatedUser.games.has("nSZTnbgacm")).toBe(false);
    expect(res).toEqual({
      msg: `Dinosaur Island has been removed from your collection.`
    });
  });
});