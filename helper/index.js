function formatter(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  }
  
module.exports = formatter

