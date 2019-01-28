const express = require('express');
const expressJwt = require('express-jwt');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');
const bookRoutes = require('./server/book/book.route');
const orderRoutes = require('./server/order/order.route');
const config = require('./config/config');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount book routes at /book
router.use('/book', expressJwt({ secret: config.jwtSecret }), bookRoutes);

// mount order routes at /order
router.use('/order', expressJwt({ secret: config.jwtSecret }), orderRoutes);

module.exports = router;
