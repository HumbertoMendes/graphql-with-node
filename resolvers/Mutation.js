const { v4: uuid } = require('uuid');

exports.Mutation = {
  addCategory: (parent, { input }, { categories }) => {
    const  { name } = input;

    const newCategory = {
      id: uuid(),
      name,
    };

    categories.push(newCategory);

    return newCategory;
  },
  addProduct: (parent, { input }, { products, categories }) => {
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
  addReview: (parent, { input }, { reviews, products }) => {
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
  }
}