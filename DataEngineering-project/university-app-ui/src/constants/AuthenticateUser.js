import gql from 'graphql-tag'

export const AUTHENTICATE_USER = gql`mutation loginUser($email: String!, $password: String!) {
                       loginUser(email: $email, password: $password){
                          token user{
                                name role id
                            }
                         }
                      }
                `;
