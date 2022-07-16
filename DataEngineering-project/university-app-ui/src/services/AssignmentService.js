import APPLLO_CLIENT from './ApolloClientService'
import * as query from '../constants/index.js'

class AssignmentService{
    static _instance = null;
    _currentCourse= null;

    static getInstance() {
        if (AssignmentService._instance == null) {
            AssignmentService._instance = new AssignmentService();
        }

        return this._instance;
    }


    createAssigment = (_courseId, _title) =>{
        return APPLLO_CLIENT.mutate({
            mutation: query.CREATE_ASSIGNEMNT,
            variables: {
                courseID:_courseId,
                name:_title,
            }}
        );
    }

    createAssigmentGrade = (_assignmentId, _studentId, _grade) =>{
        return APPLLO_CLIENT.mutate({
            mutation: query.CREATE_ASSIGNEMNT_GRADE,
            variables: {
                assignmentID:_assignmentId,
                studentID:_studentId,
                grade: _grade
            }}
        );
    }




    deleteAssigment = (_assignmentId) =>{
        return APPLLO_CLIENT.mutate({
            mutation: query.DELETE_ASSIGNMENT,
            variables: {
                assignmentID:_assignmentId
            }}
        );
    }


}


const instanceAssignmentService = AssignmentService.getInstance();
export default instanceAssignmentService;