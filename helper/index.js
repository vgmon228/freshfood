function formatter(value) {
  let newValue = new Int1.numberFormat("en.US", {
    style: "currency",
    currency: "IDR",
  });
  return newValue.format(value);
}

module.exports = formatter;
