'use strict';
const User = require('./user');
const GameCollection = require('./gameCollection.js');
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require('../_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** getGames */

describe('getGames', () => {
  it('works', async () => {
    const games = await GameCollection.getGames('u1');

    expect(games.length).toEqual(2);
    expect(games).toEqual(['316554', '221194']);
  });
});

/************************************** addGame */

describe('addGame', () => {
  const addGameObj = {
    username: 'u1',
    gameID: '270239',
  };
  it('works', async () => {
    await GameCollection.addGame(addGameObj);

    const games = new Set(await GameCollection.getGames('u1'));
    expect(games.has('270239')).toBe(true);
  });
});

/************************************** removeGame */

describe('removeGame', () => {
  const removeGameObj = {
    username: 'u1',
    gameID: '316554',
  };

  it('works', async () => {
    const games = new Set(await GameCollection.getGames('u1'));

    expect(games.has('316554')).toBe(true);

    const res = await GameCollection.removeGame(removeGameObj);

    const updatedGames = new Set(await GameCollection.getGames('u1'));

    expect(updatedGames.has('316554')).toBe(false);
    expect(res).toEqual('deleted');
  });
});
