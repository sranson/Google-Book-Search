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
        user(username: String!): User
        books(username: String): [Book]
        book(bookId: ID!): Book
    }


    type Mutation {
        login(email: String, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(userId: ID!, authors: [String], description: String, title: String, bookId: String, image: String, link: String): User
        removeBook(userId: ID!, bookId: ID!): User
    }
`;


module.exports = typeDefs;


// {
//     "userId": "60eb49fcbd4ee7219b9dee8e",
//     "authors": "Salome",  
//     "description":"test description",
//     "bookId":"test bookId",
//     "image": "test image",
//     "link": "test link"
//     }


// {
//     "email": "salome@gmail.com",
//     "password": "password"
//   }


// {
//     "userId": "60eb49fcbd4ee7219b9dee8e",
//     "bookId": "3C-4dsIGlEgC"
//   }