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
    buyerAddress: req.body.buyerAddress,
    buyerEmail: req.body.buyerEmail,
    buyerName: req.body.buyerName,
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
      buyerAddress: req.body.buyerAddress,
      buyerEmail: req.body.buyerEmail,
      buyerName: req.body.buyerName,
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
    .then(orders => res.json(orders))
    .catch(e => next(e));
}

function remove(req, res, next) {
  Order.findByIdAndRemove(req.params.orderId)
    .then(deletedOrder => res.json(deletedOrder))
    .catch(e => next(e));
}

module.exports = { get, create, update, list, remove };
