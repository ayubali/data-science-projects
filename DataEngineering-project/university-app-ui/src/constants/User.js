import gql from 'graphql-tag'


export const  ALL_FACULTIES = gql`query {
                       faculties {
                             id name email role  courses{
                                                    id name assignments{
                                                                id name 
                                                              }
                                                            professor{
                                                               id  name  email
                                                            }
                                                            students{
                                                                    id name email
                                                                    
                                                                    assignmentGrades{
                                                                                 id
                                                                                  assignment{
                                                                                          id  name
                                                                                  }
                                                                    grade
                                }
                                                            }
                                                 }
                             }
                       }
                `;



export const ALL_USERS = gql`query {
                        users {
                               id name email role
                            }
                        }
                `;


export const ALL_STUDENTS = gql`query {
                        students {
                               id name email role courses{
                                                         id  name 
                                                         professor{
                                                             id name email
                                                         }
                                                         assignments{
                                                                  id   name 
                                                         }
                                                         
                                                     } 
                                assignmentGrades{
                                 id
                                                assignment{
                                                         id  name
                                                }
                                      grade
                                }
                               }
                        }
                `;



export const  UPDATE_USER =gql`mutation updateUser($id: ID!, $user:UserInput!) {
         updateUser(id:$id, user: $user) {
           id email name role
          }
        }
      `;

export const  CREATE_USER =gql`mutation createUser($name: String!, $email: String!,  $role: Role!, $password: String!) {
         createUser(name: $name, email: $email, role: $role, password: $password) {
           id email name role
          }
        }
      `;