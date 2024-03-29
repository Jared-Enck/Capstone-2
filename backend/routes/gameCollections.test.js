'use strict';

const request = require('supertest');
const app = require('../app');

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
} = require('../_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /gameCollections/:username */
describe('GET /gameCollections/:username', () => {
  it('works for owner', async () => {
    const resp = await request(app)
      .get('/gameCollections/u1')
      .set('authorization', u1Token);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual(expect.any(Object));
  });

  it('throws unauth for not owner', async function () {
    const resp = await request(app)
      .get('/gameCollections/u1')
      .set('authorization', u2Token);
    expect(resp.statusCode).toEqual(401);
  });

  it('throws unauth with anon user', async () => {
    const resp = await request(app).get('/gameCollections/u1');
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** POST /gameCollections/:username */

describe('POST /gameCollections/:username', () => {
  const addGameObj = {
    gameID: '270239',
  };
  it('works for owner', async () => {
    const resp = await request(app)
      .post('/gameCollections/u1')
      .send(addGameObj)
      .set('authorization', u1Token);
    expect(resp.body).toEqual('added');
  });

  it('throws unauth for not owner', async function () {
    const resp = await request(app)
      .post('/gameCollections/u1')
      .send(addGameObj)
      .set('authorization', u2Token);
    expect(resp.statusCode).toEqual(401);
  });

  it('throws unauth with anon user', async () => {
    const resp = await request(app)
      .post('/gameCollections/u1')
      .send(addGameObj);
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** DELETE /gameCollections/:username */

describe('DELETE /gameCollections/:username', () => {
  const removeGameObj = {
    gameID: '221194',
  };
  it('works for owner', async () => {
    const resp = await request(app)
      .delete('/gameCollections/u1')
      .send(removeGameObj)
      .set('authorization', u1Token);
    expect(resp.body).toEqual('deleted');
  });

  it('throws unauth for not owner', async function () {
    const resp = await request(app)
      .delete('/gameCollections/u1')
      .send(removeGameObj)
      .set('authorization', u2Token);
    expect(resp.statusCode).toEqual(401);
  });

  it('throws unauth with anon user', async () => {
    const resp = await request(app)
      .delete('/gameCollections/u1')
      .send(removeGameObj);
    expect(resp.statusCode).toEqual(401);
  });
});
