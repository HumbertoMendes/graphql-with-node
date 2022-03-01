const products = require('../data/products');
const categories = require('../data/categories');

exports.Query = {
  hello: () => {
    return 'world'
  },
  product: (parent, args, context) => {
    const { id } = args;

    return products.find((product) => product.id === id);
  },
  products: () => products,
  category: (parent, args, context) => {
    const { id } = args;

    return categories.find((category) => category.id === id);
  },
  categories: () => categories,
};