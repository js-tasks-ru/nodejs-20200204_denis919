function sum(a, b) {
  console.log(typeof a, typeof b);

  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Not a number');
  }
  return a + b;
}

module.exports = sum;
