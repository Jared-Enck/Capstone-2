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
    expect(games).toEqual(['e44jncYuUp', 'nSZTnbgacm']);
  });
});

/************************************** addGame */

describe('addGame', () => {
  const addGameObj = {
    username: 'u1',
    id: '78ZDzlpvdb',
  };
  it('works', async () => {
    await GameCollection.addGame(addGameObj);

    const games = new Set(await GameCollection.getGames('u1'));
    expect(games.has('78ZDzlpvdb')).toBe(true);
  });
});

/************************************** removeGame */

describe('removeGame', () => {
  const removeGameObj = {
    username: 'u1',
    id: 'nSZTnbgacm',
  };

  it('works', async () => {
    const games = new Set(await GameCollection.getGames('u1'));

    expect(games.has('nSZTnbgacm')).toBe(true);

    const res = await GameCollection.removeGame(removeGameObj);

    const updatedGames = new Set(await GameCollection.getGames('u1'));

    expect(updatedGames.has('nSZTnbgacm')).toBe(false);
    expect(res).toEqual('deleted');
  });
});
