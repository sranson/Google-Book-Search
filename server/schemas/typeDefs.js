const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type me {
        user: User   
    }

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
        saveBook(bookId: ID!, authors: [String], description: String!, title: String!, image: String!): [Book]
        removeBook(userId: ID!, bookId: ID!): User
    }
`;


module.exports = typeDefs;


