export const GET_USER = `
  query GetUser($userId: String!) {
    getUser(userId: $userId) {
      id
      email
      alias
      photoUrl
    }
  }
`;
