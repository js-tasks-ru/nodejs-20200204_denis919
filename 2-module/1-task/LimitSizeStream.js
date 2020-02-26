const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor({ limit, ...options }) {
    super(options);
    this.limit = limit;
    this.totalSize = 0;
  }

  _transform(chunk, encoding, callback) {
    this.totalSize += chunk.length;
    if (this.totalSize > this.limit) {
      const err = new LimitExceededError(`Превышен лимит: ${this.limit}`);
      callback(err);
    } else {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
