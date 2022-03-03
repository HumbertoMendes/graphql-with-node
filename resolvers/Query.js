exports.Query = {
  hello: () => {
    return 'world'
  },
  product: (parent, { id }, { db }) => {
    const { products } = db;

    return products.find((product) => product.id === id);
  },
  products: (parent, { filter }, { db }) => {
    const { products, reviews } = db;
    let filteredProducts = products;

    if (filter) {
      const { onSale = false, minRating = 0 } = filter;

      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => {
          return product.onSale;
        });
      }

      if ([1,2,3,4,5].includes(minRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;

          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });

          return minRating <= (sumRating/numberOfReviews);
        });
      }
    }

    return filteredProducts;
  },
  category: (parent, { id: categoryId }, { db }) => {
    const { categories } = db;

    return categories.find((category) => category.id === categoryId);
  },
  categories: (parent, args, { db }) => db.categories,
};