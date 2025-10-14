export const UPDATE_USER = `
    mutation UpdateUser ($email: String!, $password: String, $alias: String!){
        updateUser(
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
