export const LOGIN_USER =`
    mutation LoginUser ($email: String!, $password: String!){
        loginUser(email: $email, password: $password) {
            localId
            email
            alias
            idToken
            registered
            refreshToken
            expiresIn
        }
    }
`;
