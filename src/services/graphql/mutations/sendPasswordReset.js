export const SEND_PASSWORD_RESET= `
    mutation SendPasswordReset ($email: String!){
        sendPasswordResetEmail(email: $email) {
            success
            response
        }
    }
`;
