import APPLLO_CLIENT from './ApolloClientService'
import * as query from '../constants/index.js'

class CourseService {
    static _instance = null;
    _currentCourse= null;

    static getInstance() {
        if (CourseService._instance == null) {
            CourseService._instance = new CourseService();
        }

        return this._instance;
    }

    getCourses = () => {
        return APPLLO_CLIENT
            .query({
                query: query.ALL_COURSES
            });

    }

    createCourse = (name, facultyId) =>{
        return APPLLO_CLIENT.mutate({
            mutation: query.CREATE_COURSE,
            variables: {
                name:name,
                facultyID:facultyId,
            }}
        );
    };


    deleteCourse = (courseID) =>{
        return APPLLO_CLIENT.mutate({
            mutation: query.DELETE_COURSE,
            variables: {
                courseID:courseID
            }}
        );
    }


    setCurrentCourse = (_course) =>{
        this._currentCourse = _course;
    }


    addCourseToStudent = (_courseId, _studentId) => {
        return APPLLO_CLIENT.mutate({
            mutation: query.ADD_STUDENT_COURSE,
            variables: {
                courseID:_courseId,
                studentID: _studentId
            }}
        );
    }


    getCurrentCourse =() =>{
        return this._currentCourse;
    }




}


const instanceCourseService = CourseService.getInstance();
export default instanceCourseService;