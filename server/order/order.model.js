const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const OrderSchema = new mongoose.Schema({
  buyerAddress: {
    type: String,
    required: true
  },
  buyerEmail: {
    type: String,
    required: true
  },
  buyerName: {
    type: String,
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

OrderSchema.method({});

/**
 * Statics
 */
OrderSchema.statics = {
  get(id) {
    return this.findById(id)
      .populate('book')
      .exec()
      .then((order) => {
        if (order) {
          return order;
        }
        const err = new APIError('No order exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

module.exports = mongoose.model('Order', OrderSchema);
