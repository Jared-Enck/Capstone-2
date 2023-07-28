'use strict';

const db = require('../db.js');
const { BadRequestError, NotFoundError } = require('../expressError.js');
const Group = require('./group.js');
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

/************************************** create */
describe('create', () => {
  const userArr = ['u1', 'u2', 'u3'];
  it('works', async () => {
    const newGroup = {
      users: [userArr[0]],
      name: 'New',
      adminUsername: 'u1',
    };

    let res = await Group.create(newGroup);

    expect(res).toEqual({
      group: {
        id: expect.any(Number),
        name: 'New',
        adminUsername: 'u1',
        imageURL: expect.any(String),
      },
      msg: expect.any(String),
    });
  });

  it('works with multiple users assigned at creation.', async () => {
    const newGroup2 = {
      users: [...userArr],
      name: 'New2',
      adminUsername: 'u2',
    };

    let res = await Group.create(newGroup2);

    expect(res).toEqual({
      group: {
        id: expect.any(Number),
        name: 'New2',
        adminUsername: 'u2',
        imageURL: expect.any(String),
      },
      msg: expect.any(String),
    });

    let groupUsers = await Group.getUsers(res.group.id);

    expect(groupUsers).toEqual([
      {
        username: 'u1',
      },
      {
        username: 'u2',
      },
      {
        username: 'u3',
      },
    ]);
  });

  it('throws bad request with dupe', async () => {
    const newGroup = {
      users: ['u1'],
      name: 'New',
      adminUserID: 'u1',
    };

    try {
      await Group.create(newGroup);
      await Group.create(newGroup);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** getUsers */
describe('getUsers', () => {
  it('works', async () => {
    let users = await Group.getUsers(1);

    expect(users).toEqual([
      {
        username: 'u1',
      },
      {
        username: 'u2',
      },
    ]);
  });

  it('throws not found if no such group', async () => {
    try {
      await Group.getUsers(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** addUsers */
describe('addUsers', () => {
  it('works', async () => {
    let groupUsers1 = await Group.getUsers(1);

    expect(groupUsers1).toEqual([
      {
        username: 'u1',
      },
      {
        username: 'u2',
      },
    ]);

    await Group.addUsers(1, ['u3']);

    let newGroupUsers = await Group.getUsers(1);
    expect(newGroupUsers).toEqual([
      {
        username: 'u1',
      },
      {
        username: 'u2',
      },
      {
        username: 'u3',
      },
    ]);
  });

  it('throws not found if no such group', async () => {
    try {
      await Group.addUsers(0, ['u3']);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe('update', () => {
  const updateData = {
    name: 'newGroupName',
  };

  it('works', async () => {
    let res = await Group.update(1, updateData);
    expect(res).toEqual({
      id: 1,
      name: 'newGroupName',
      imageURL: expect.any(String),
    });
  });

  it('throws not found if no such group', async () => {
    try {
      await Group.update(0, {
        name: 'it',
      });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  it('throws bad request if no data', async () => {
    expect.assertions(1);
    try {
      await Group.update(1, {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});
/************************************** remove */

describe('delete', () => {
  it('works', async () => {
    await Group.delete(1);
    const res = await db.query(`SELECT * FROM groups WHERE id=1`);
    expect(res.rows.length).toEqual(0);
  });

  it('throws not found if no such group', async () => {
    try {
      await Group.delete(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** leave */
describe('leave', () => {
  it('works', async () => {
    1;
    let users = await Group.getUsers(1);

    expect(users).toEqual([
      {
        username: 'u1',
      },
      {
        username: 'u2',
      },
    ]);

    await Group.leave(1, 'u2');

    let updatedUsers = await Group.getUsers(1);

    expect(updatedUsers).toEqual([
      {
        username: 'u1',
      },
    ]);
  });

  it('throws not found if no such group', async () => {
    try {
      await Group.leave(0, 'u2');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
