import React, {Component} from "react";
import  instanceUserService from '../services/UserService'
import  instanceAuthService from '../services/AuthService'
import Table from 'react-bootstrap/Table'
import  {Link} from 'react-router-dom'
import  instanceCourseService from "../services/CourseService"

class FacultyHome extends Component {

    constructor(props) {
        super(props);
        this.userService = instanceUserService;
        this.state = {
            loginStudent: null,
            assignments:[],
            assinmentGrades:[]
        };

        this.Auth = instanceAuthService;
        this.loginuser = this.Auth.getLoginUser();
        this.courseService = instanceCourseService;
    }

    selectCourse = (course) => {
        this.courseService.setCurrentCourse(course);
    };


    componentDidMount() {
        this.userService.getFaculties().then(res => {
            let _loginStudent = res.data.faculties.find(student => student.id === this.loginuser.user.id);
            this.setState({loginStudent: _loginStudent});
            let _assignments = [];
            let _id =0;
            if(_loginStudent.courses != null){
                for(const course of _loginStudent.courses){
                    if (course.assignments != null && course.assignments.length > 0){
                        for (let assignment of course.assignments){
                            let assignmentObj = {
                                id:_id++,
                                courseName: course.name,
                                assignmentName:  assignment.name
                            };
                            _assignments.push(assignmentObj);
                        }
                    }
                }
            }

            this.setState({assignments: _assignments});


        }).catch(error => {
            console.log('Failed to get profile data for faculty', error)
        });

    }

    render() {
        return (
            <div>
                <h5>Course List</h5>
                <hr/>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.loginStudent != null && this.state.loginStudent.courses != null &&
                    this.state.loginStudent.courses.length > 0 ? (
                        this.state.loginStudent.courses.map(course => (
                            <tr key={course.id}>
                                <td> <Link to={`/courses/${course.id}`} onClick={ () => this.selectCourse(course)} >{course.name}</Link></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2}>No Courses</td>
                        </tr>
                    )}
                    </tbody>
                </Table>

                <h5>Assignment List</h5>
                <hr/>

                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Course</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.assignments != null &&
                    this.state.assignments.length > 0 ? (
                        this.state.assignments.map(assinment => (
                            <tr key={assinment.id}>
                                <td>{assinment.assignmentName}</td>
                                <td>{assinment.courseName}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2}>No Assignment</td>
                        </tr>
                    )}
                    </tbody>
                </Table>

            </div>
        );
    }
}

export default FacultyHome;