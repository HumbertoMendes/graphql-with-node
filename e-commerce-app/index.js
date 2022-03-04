const { ApolloServer } = require('apollo-server');

// Scalar types: String, Int, Float, Boolean, ID
// ! === required

const typeDefs = require('./schema');
const { Query, Product, Category, Mutation } = require('./resolvers');
const { db } = require('./db');

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Product,
    Category,
    Mutation,
  },
  context: {
    db,
  }
});

server.listen().then(({ url }) => {
  console.log('Server is ready at ' + url);
});