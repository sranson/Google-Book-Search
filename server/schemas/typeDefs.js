const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type me {
        me: User   
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: String
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    input saveBookInput {
        authors: [String]
        description: String
        title: String
        bookId: ID
        image: String
        link: String
      }

    type Book {
        _id: ID,
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    
    type Query {
        me(userId: ID!): User
        users: [User]
        savedBooks(userId: ID!): User
    }


    type Mutation {
        login(email: String, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: saveBookInput): User
        removeBook(bookId: ID!): User
    }
`;


module.exports = typeDefs;


