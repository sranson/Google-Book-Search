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
       
       me: async (parent, args, context) => {
        if (context.user) {
            return User.findById({ _id: userId }).populate('books');
        }
        throw new AuthenticationError('You need to be logged in!');
      },
       savedBooks: async(parent, { userId }) => {
        return User.findById({ _id: userId }).populate('books');
       }
    },


    Mutation: {
        addUser: async (parent, { username, email, password}) => {
            const user = await User.create({ username, email, password });
            const token = signToken(User);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
            const user = await User.findOne({ email });

            // If there is no user with that email address, return an Authentication error stating so
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }
            
            // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
            const correctPw = await user.isCorrectPassword(password);

            // If the password is incorrect, return an Authentication error stating so
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            // If email and password are correct, sign user into the application with a JWT
            const token = signToken(user);

            // Return an `Auth` object that consists of the signed token and user's information
            return { token, user};
        },

        // Add a third argument to the resolver to access data in our `context`
        saveBook: async (parent, { userId, authors, description, title, bookId, image, link }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    { 
                        $addToSet: { savedBooks: authors, description, title, bookId, image, link } 
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            // If user attempts to execute this mutation and isn't logged in, throw an error
            throw new AuthenticationError('You need to be logged in!');
        },


        removeBook: async (parent, { userId, bookId }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    }
}


module.exports = resolvers;
