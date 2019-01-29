const express = require('express');
const orderCtrl = require('./order.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(orderCtrl.list)

  .post(orderCtrl.create);

router.route('/:orderId')
  .get(orderCtrl.get)

  .put(orderCtrl.update)

  .delete(orderCtrl.remove);


module.exports = router;
