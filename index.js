const { ApolloServer, gql } = require('apollo-server');

// Scalar types: String, Int, Float, Boolean, ID
// ! === required

const typeDefs = gql`
  type Query {
    hello: String!,
    numberOfAnimals: Int,
    price: Float,
    isCool: Boolean,
    hellos: [String],
    nonNullHellos: [String!]!,
  }

  type Product {
    name: String!,
    description: String!,
    quantity: Int!,
    price: Float!,
    onSale: Boolean!,
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return 'worlda?'
    },
    numberOfAnimals: () => {
      return 55;
    },
    price: () => {
      return 31273.3781;
    },
    isCool: () => false,
    hellos: () => 'asd'.split(''),
    nonNullHellos: () => 'qwe'.split(''),
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log('Server is ready at ' + url);
});