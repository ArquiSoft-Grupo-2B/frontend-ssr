export const VERIFY_TOKEN = `
    mutation VerifyToken ($idtoken: String!){
    verifyToken(idToken: $idtoken) {
        uid
        email
        emailVerified
        userInfo {
        name
        userId
        }
    }
}
`;
