// resolvers.js: Define the query and mutation functionality to work with the Mongoose models.
// Hint: Use the functionality in the user-controller.js as a guide.

const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');



const resolvers = {
    Query: {
        Users: async() => {
            const allUsers = await User.find({})
            return allUsers;
        },
       me: async (parent, args, context) => {
        console.log(`User Context: ${context.user}`);
        if (context.user) {
            const userDetails = await User.findOne({ _id: context.user._id })
            console.log(`USER DETAILS: ${userDetails}`);
            return userDetails;
        }
        throw new AuthenticationError('YOU NEED TO BE LOGGED IN');
      }
    },


    Mutation: {
        addUser: async (parent, { username, email, password}) => {
            const user = await User.create({ username, email, password });
            if (!user) {
                throw new AuthenticationError('Unable to find this user')
            }
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
        saveBook: async (parent, { bookId, authors, description, title, image, link }, context) => {
            if (context.user) {
                console.log(`USER ID: ${context.user._id}`)
                console.log(`USERNAME: ${context.user.username}`)
                console.log(`EMAIL: ${context.user.email}`)
                console.log(`BOOK ID: ${bookId}`);
                console.log(`BOOK Title: ${title}`);
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: {bookId: bookId, authors: authors, description: description, title: title, image: image, link: link } } },
                    { new: true, runValidators: true }
                );
                return updatedUser
            } else {
                // If user attempts to execute this mutation and isn't logged in, throw an error
                throw new AuthenticationError('You need to be logged in!');
            }
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    }
}


module.exports = resolvers;
