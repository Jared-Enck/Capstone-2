'use strict';

/** Express app for Game Night. */

const express = require('express');
const cors = require('cors');
const { NotFoundError } = require('./expressError');
const { authenticateJWT } = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const groupsRoutes = require('./routes/groups');
const gameCollectionsRoutes = require('./routes/gameCollections');
const apiRoutes = require('./routes/api');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(authenticateJWT);

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/groups', groupsRoutes);
app.use('/gameCollections', gameCollectionsRoutes);
app.use('/api', apiRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError(req.body));
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
