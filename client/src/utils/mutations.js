import { gql } from '@apollo/client';


// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;


// ADD_USER will execute the addUser mutation.
export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;


// SAVE_BOOK will execute the saveBook mutation.
export const SAVE_BOOK = gql`
mutation saveBook ($userId: ID!, $authors: [String], $description: String, $title: String, $bookId: String, $image: String, $link: String) {
  saveBook(userId: $userId, authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
		_id
    username
 		savedBooks {
      title
    }
  }
}
`;

// REMOVE_BOOK will execute the removeBook mutation.




