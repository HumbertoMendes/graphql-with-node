const categories = require('../data/categories');

exports.Product = {
  category: (parent, args, context) => {
    const { categoryId } = parent;

    return categories.find((category) => category.id === categoryId);
  },
};