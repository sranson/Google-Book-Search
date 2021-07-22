import { gql } from '@apollo/client';


// This will hold the query GET_ME, which will execute the me query set up using Apollo Server.

export const GET_ME = gql`
query GET_ME {
	me {
    _id
    username
    email
    bookCount
    savedBooks {
      _id
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
