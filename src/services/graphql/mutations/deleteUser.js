export const DELETE_USER= `
    mutation DeleteUser ($user_id: String!){
        deleteUser(userId: $user_id)
    }
`;
