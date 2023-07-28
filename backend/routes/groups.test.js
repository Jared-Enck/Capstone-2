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

/************************************** POST /groups */

describe('POST /groups', () => {
  const newGroup = {
    users: ['u1', 'u2'],
    name: 'newGroup',
  };
  it('works', async () => {
    const resp = await request(app)
      .post('/groups')
      .send(newGroup)
      .set('authorization', u1Token);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      group: {
        id: expect.any(Number),
        name: 'newGroup',
        adminUsername: 'u1',
        imageURL: expect.any(String),
      },
      msg: expect.any(String),
    });
  });

  it('throws bad request with missing fields', async () => {
    const resp = await request(app)
      .post('/groups')
      .send({
        users: ['u1'],
      })
      .set('authorization', u2Token);
    expect(resp.statusCode).toEqual(400);
  });

  it('throws bad request with invalid data', async () => {
    const resp = await request(app)
      .post('/groups')
      .send({
        users: [3],
        name: 'newGroup',
      })
      .set('authorization', u1Token);
    expect(resp.statusCode).toEqual(400);
  });

  it('throws bad request with duplicate name under current users groups', async () => {
    const resp = await request(app)
      .post('/groups')
      .send({
        users: ['u1'],
        name: 'group1',
      })
      .set('authorization', u1Token);
    expect(resp.statusCode).toEqual(400);
  });

  it('throws unauth with anon user', async () => {
    const resp = await request(app)
      .post('/groups')
      .send({
        users: ['u3'],
        name: 'newGroup',
      });
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** POST /groups/:groupID */

describe('POST /groups/:groupID', () => {
  it('works', async () => {
    const resp = await request(app)
      .post('/groups/1')
      .send({
        groupUsers: ['u1', 'u2'],
        addUsers: ['u3'],
      })
      .set('authorization', u1Token);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      msg: expect.any(String),
    });
  });

  it('throws bad request with invalid data', async () => {
    const resp = await request(app)
      .post('/groups/1')
      .send({
        groupUsers: ['u1', 'u2'],
        addUsers: [3],
      })
      .set('authorization', u1Token);
    expect(resp.statusCode).toEqual(400);
  });

  it('throws unauth with anon user', async () => {
    const resp = await request(app)
      .post('/groups/1')
      .send({
        groupUsers: ['u1', 'u2'],
        addUsers: ['u3'],
      });
    expect(resp.statusCode).toEqual(401);
  });

  it('throws unauth with non group user', async () => {
    const resp = await request(app)
      .post('/groups/2')
      .send({
        groupUsers: ['u2'],
        addUsers: ['u1'],
      })
      .set('authorization', u1Token);
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** PATCH /groups/:groups/edit */

describe('PATCH /groups/:groupID/edit', () => {
  it('works for group user', async () => {
    const resp = await request(app)
      .patch('/groups/1/edit')
      .send({
        groupUsers: ['u1', 'u2'],
        name: 'newGroupName',
      })
      .set('authorization', u2Token);
    expect(resp.body).toEqual({
      id: 1,
      name: 'newGroupName',
      imageURL: expect.any(String),
    });
  });

  it('throws unauth with anon user', async () => {
    const resp = await request(app)
      .patch('/groups/1/edit')
      .send({
        groupUsers: ['u1', 'u2'],
        name: 'newGroupName',
      });
    expect(resp.statusCode).toEqual(401);
  });

  it('throws unauth with non group user', async () => {
    const resp = await request(app)
      .patch('/groups/2/edit')
      .send({
        groupUsers: ['u2'],
        name: 'newGroupName',
      })
      .set('authorization', u1Token);
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** DELETE /groups/:groupID */

describe('DELETE /groups/:groupID', function () {
  it('works for group admin user', async function () {
    const resp = await request(app)
      .delete(`/groups/1`)
      .send({ adminUsername: 'u1' })
      .set('authorization', u1Token);
    expect(resp.body).toEqual({ deleted: 1 });
  });

  it('throws unauth for not group admin user', async function () {
    const resp = await request(app)
      .delete(`/groups/1`)
      .send({ adminUsername: 'u1' })
      .set('authorization', u2Token);
    expect(resp.statusCode).toEqual(401);
  });

  it('throws unauth for anon user', async function () {
    const resp = await request(app)
      .delete(`/groups/1`)
      .send({ adminUsername: 'u1' });
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** PATCH /groups/:groupID/leave */

describe('PATCH /groups/:groupID/leave', function () {
  it('works', async function () {
    const resp = await request(app)
      .patch(`/groups/1/leave`)
      .send({ username: 'u2' })
      .set('authorization', u2Token);
    expect(resp.body).toEqual({ msg: `u2 left the group.` });
  });

  it('throws unauth for anon user', async function () {
    const resp = await request(app)
      .patch(`/groups/1/leave`)
      .send({ username: 'u2' });
    expect(resp.statusCode).toEqual(401);
  });
});
