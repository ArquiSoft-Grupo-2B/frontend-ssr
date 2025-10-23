export const CREATE_USER = `
  mutation CreateUser($email: String!, $password: String!, $alias: String!) {
    createUser(
      userInput: {
        email: $email
        password: $password
        alias: $alias
      }
    ) {
      id
      email
      alias
      photoUrl
    }
  }
`;

