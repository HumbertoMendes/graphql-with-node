const products = require('../data/products');

exports.Category = {
  products: (parent, args, context) => {
    const { id } = parent;

    return products.filter((product) => product.categoryId === id);
  },
};