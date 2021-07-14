import { gql } from '@apollo/client';


// This will hold the query GET_ME, which will execute the me query set up using Apollo Server.

export const GET_ME = gql`
query me($userId:ID!) {
    me(userId: $userId){
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;