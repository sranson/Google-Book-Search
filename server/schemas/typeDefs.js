const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: String
        savedBooks: [Book]!
    }

    type Auth {
        token: ID!
        user: User
    }


    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    
    type Query {
        me: User
        users: [User]
        user(username: String!): User
        books(username: String): [Book]
        book(bookId: ID!): Book
    }


    type Mutation {
        login(email: String, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String], description: String, title: String, bookId: String, image: String, link: String): User
        removeBook(userId: ID!, bookId: ID!): User
    }
`;


module.exports = typeDefs;