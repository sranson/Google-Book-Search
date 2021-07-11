const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }


    type Book {
        authors: String
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    
    type Query {
        user(username: String!): User
        users: [User]
        books(username: String): [Book]
        book(bookId: ID!): Book
    }


    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String, password: String!): Auth
        saveBook(authors: String, description: String, bookId: String, image: String, link: String, title: String): Book
        deleteBook(bookId: ID!): Book
    }
`;


module.exports = typeDefs;