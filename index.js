const { ApolloServer } = require('apollo-server');

// Scalar types: String, Int, Float, Boolean, ID
// ! === required

const typeDefs = require('./schema');
const { Query, Product, Category, Mutation } = require('./resolvers');
const products = require('./data/products');
const categories = require('./data/categories');
const reviews = require('./data/reviews');

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Product,
    Category,
    Mutation,
  },
  context: {
    products,
    categories,
    reviews,
  }
});

server.listen().then(({ url }) => {
  console.log('Server is ready at ' + url);
});