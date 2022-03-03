exports.Product = {
  category: ({ categoryId }, args, { db }) => {
    const { categories } = db;
    return categories.find((category) => category.id === categoryId);
  },
  reviews: ({ id: productId }, args, { db }) => {
    const { reviews } = db;
    return reviews.filter((review) => review.productId === productId);
  },
};