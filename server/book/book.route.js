const express = require('express');
const bookCtrl = require('./book.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(bookCtrl.list)

  .post(bookCtrl.create);

router.route('/:bookId')
  .get(bookCtrl.get)

  .put(bookCtrl.update)

  .delete(bookCtrl.remove);


module.exports = router;
