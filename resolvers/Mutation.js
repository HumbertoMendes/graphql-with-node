const { v4: uuid } = require('uuid');

exports.Mutation = {
  addCategory: (parent, { input }, { db }) => {
    const { categories } = db;
    const { name } = input;

    const newCategory = {
      id: uuid(),
      name,
    };

    categories.push(newCategory);

    return newCategory;
  },
  addProduct: (parent, { input }, { db }) => {
    const { products, categories } = db;
    const { name, description, quantity, price, image, onSale, categoryId = "" } = input;

    if (categoryId && !categories.find((category) => category.id === categoryId)) throw new Error('Category not found');

    const newProduct = {
      id: uuid(),
      name,
      description,
      quantity,
      price,
      image,
      onSale,
      categoryId,
    };

    products.push(newProduct);

    return newProduct;
  },
  addReview: (parent, { input }, { db }) => {
    const { reviews, products } = db;
    const { title, comment, rating, productId } = input;

    if (!products.find((product) => product.id === productId)) throw new Error('Product not found');
    if (![1,2,3,4,5].includes(rating)) throw new Error('Invalid rating');

    const date = new Date();
    const newReview = {
      id: uuid(),
      title,
      comment,
      rating,
      productId,
      date: `${date.getFullYear}-${date.getMonth}-${date.getDate}`,
    };

    reviews.push(newReview);

    return newReview;
  },
  deleteCategory: (parent, { id }, { db }) => {
    const { categories, products } = db;

    if (!categories.find((category) => category.id === id)) return false;

    db.categories = categories.filter((category) => category.id !== id);
    db.products = products.map((product) => {
      return product.categoryId === id
        ? {
          ...product,
          categoryId: null,
        }
        : product;
    });

    return true;
  },
  deleteProduct: (parent, { id }, { db }) => {
    const { products, reviews } = db;

    if (!products.find((product) => product.id === id)) return false;

    db.products = products.filter((product) => product.id !== id);
    db.reviews = reviews.filter((review) => review.productId !== id);

    return true;
  },
  deleteReview: (parent, { id }, { db }) => {
    const { reviews } = db;

    if (!reviews.find((review) => review.id === id)) return false;

    db.reviews = reviews.filter((review) => review.id !== id);

    return true;
  },
  updateCategory: (parent, { id, input }, { db }) => {
    const index = db.categories.findIndex((category) => category.id === id);

    db.categories[index] = {
      ...db.categories[index],
      ...input,
    };
    
    return db.categories[index];
  },

  updateProduct: (parent, { id, input }, { db }) => {
    const index = db.products.findIndex((product) => product.id === id);

    db.products[index] = {
      ...db.products[index],
      ...input,
    };
    
    return db.products[index];
  },

  updateReview: (parent, { id, input }, { db }) => {
    const index = db.reviews.findIndex((review) => review.id === id);

    db.review[index] = {
      ...db.review[index],
      ...input,
    };
    
    return db.review[index];   
  },
}