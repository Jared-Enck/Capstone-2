"use strict";

const env = process.env

describe("config can come from env", () => {
  it("works", function() {
    env.SECRET_KEY = "abc";
    env.PORT = "3001";
    env.DATABASE = "other";
    env.NODE_ENV = "other";

    const config = require("./config");
    expect(config.SECRET_KEY).toEqual("abc");
    expect(config.PORT).toEqual(3001);
    expect(config.DB_URI()).toEqual(
      "socket:/var/run/postgresql?db=other"
      );
    expect(config.BCRYPT_WORK_FACTOR).toEqual(13);

    delete env.SECRET_KEY;
    delete env.PORT;
    delete env.BCRYPT_WORK_FACTOR;
    env.DATABASE = "game_night"

    expect(config.DB_URI()).toEqual(
      "socket:/var/run/postgresql?db=game_night"
      );
    env.NODE_ENV = "test";

    expect(config.DB_URI()).toEqual(
      "socket:/var/run/postgresql?db=game_night_test"
      );
  });
})