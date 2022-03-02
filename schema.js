const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    hello: String!,
    products(filter: ProductsFilterInput): [Product!]!,
    product(id: ID!): Product,
    categories: [Category!]!,
    category(id: ID!): Category,
  }

  type Mutation {
    addCategory(input: AddCategoryInput!): Category!
    addProduct(input: AddProductInput!): Product!
    addReview(input: AddReviewInput!): Review!
  }

  type Product {
    id: ID!,
    name: String!,
    description: String!,
    quantity: Int!,
    price: Float!,
    image: String,
    onSale: Boolean!,
    category: Category,
    reviews: [Review!]!,
  }

  type Category {
    id: ID!,
    name: String!,
    products(filter: ProductsFilterInput): [Product!]!,
  }

  type Review {
    id: ID!,
    date: String!,
    title: String!,
    comment: String!,
    rating: Int!,
  }

  input ProductsFilterInput {
    onSale: Boolean,
    minRating: Int,
  }

  input AddCategoryInput {
    name: String!
  }

  input AddProductInput {
    name: String!,
    description: String!,
    quantity: Int!,
    price: Float!,
    image: String!,
    onSale: Boolean!,
    categoryId: ID,
  }

  input AddReviewInput {
    title: String!,
    comment: String!,
    rating: Int!,
    productId: ID!,
  }
`;