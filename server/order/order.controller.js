const Order = require('./order.model');

function get(req, res, next) {
  Order.get(req.params.orderId)
    .then((order) => {
      res.json(order);
    })
    .catch(next);
}

function create(req, res, next) {
  const order = new Order({
    address: req.body.address,
    email: req.body.email,
    book: req.body.book
  });

  order
    .save()
    .then(savedOrder => res.json(savedOrder))
    .catch(e => next(e));
}

function update(req, res, next) {
  Order.findByIdAndUpdate(
    req.params.orderId,
    {
      address: req.body.address,
      email: req.body.email,
      book: req.body.book
    },
    {},
    (err, order) => {
      if (err) return next(err);
      return res.send(order);
    }
  );
}

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Order.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

function remove(req, res, next) {
  Order
    .findByIdAndRemove(req.params.orderId)
    .then(deletedOrder => res.json(deletedOrder))
    .catch(e => next(e));
}

module.exports = { get, create, update, list, remove };
