import gql from 'graphql-tag'


    export const  CREATE_ASSIGNEMNT =gql`mutation createAssignment($courseID: ID!, $name: String!){
                 createAssignment(courseID: $courseID, name: $name) {
                          id name course{
                                    id name
                            }
                        }
                }
      `;



export const  CREATE_ASSIGNEMNT_GRADE =gql`mutation createAssignmentGrade($assignmentID: ID!, $studentID:ID!, $grade: Float!){
                 createAssignmentGrade(assignmentID: $assignmentID,studentID: $studentID, grade:$grade) {
                         
                          assignment{
                                    id name
                          } student{
                                 name
                          } grade
                                        
                        }
                }
      `;



export const  DELETE_ASSIGNMENT = gql`mutation deleteAssignment($assignmentID: ID!){
                 deleteAssignment(assignmentID: $assignmentID) {
                          id  name  
                        }
                }
      `;
