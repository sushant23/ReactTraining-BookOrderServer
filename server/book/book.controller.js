const Book = require('./book.model');

function get(req, res, next) {
  Book.get(req.params.bookId)
    .then((book) => {
      res.json(book);
    })
    .catch(next);
}

function create(req, res, next) {
  const book = new Book({
    name: req.body.name,
    author: req.body.author
  });

  book
    .save()
    .then(savedBook => res.json(savedBook))
    .catch(e => next(e));
}

function update(req, res, next) {
  Book.findByIdAndUpdate(
    req.params.bookId,
    { name: req.body.name, author: req.body.author },
    {},
    (err, book) => {
      if (err) return next(err);
      return res.send(book);
    }
  );
}

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Book.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

function remove(req, res, next) {
  Book
    .findByIdAndRemove(req.params.bookId)
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

module.exports = { get, create, update, list, remove };
