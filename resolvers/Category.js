exports.Category = {
  products: ({ id }, { filter }, { db }) => {
    const { products } = db;
    const categoryProducts = products.filter((product) => product.categoryId === id);
    let filteredCategoryProducts = categoryProducts;

    if (filter) {
      const { onSale = false, minRating = 0 } = filter;

      if (onSale) {
        filteredCategoryProducts = filteredCategoryProducts.filter((product) => {
          return product.onSale;
        });
      }

      if ([1,2,3,4,5].includes(minRating)) {
        filteredCategoryProducts = filteredCategoryProducts.filter((product) => {
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

    return filteredCategoryProducts;
  },
};