// resolvers.js: Define the query and mutation functionality to work with the Mongoose models.
// Hint: Use the functionality in the user-controller.js as a guide.

const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');



const resolvers = {
    Query: {
       users: async () => {
           return User.find().populate('books');
       }, 
       user: async (parent, { username }) => {
           return User.findOne({ username }).populate('books');
       },
       books: async(parent, { username }) => {
           const params = username ? { username } : {};
           return Book.find(params);
       },
    },


    Mutation: {
        addUser: async (parent, { username, email, password}) => {
            const user = User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user};
        },
        saveBook: async (parent, { user } ) => {
            console.log(user);
            await User.findOneAndUpdate(
                { username },
                { $addToSet: { savedBooks: book._id } }
            )
        },
        removeBook: async (parent, { userId, bookId }) => {
            return User.findOneAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            );
        },
    }
}


module.exports = resolvers;