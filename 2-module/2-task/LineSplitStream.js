const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this._nextStr = '';
  }

  _transform(chunk, encoding, callback) {
    const chunkArr = chunk.toString().split(`${os.EOL}`);

    chunkArr.forEach((str, idx) => {
      if (chunkArr.length === idx + 1) {
        this._nextStr += str;
      } else {
        this.push(this._nextStr += str);
        this._nextStr = '';
      }
    });

    callback();
  }

  _flush(callback) {
    callback(null, this._nextStr);
  }
}

module.exports = LineSplitStream;
