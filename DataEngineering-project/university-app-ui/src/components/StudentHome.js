import React, {Component} from "react";
import  instanceUserService from '../services/UserService'
import  instanceAuthService from '../services/AuthService'
import Table from 'react-bootstrap/Table'

class StudentHome extends Component {

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
    }

    componentDidMount() {
        this.userService.getStudents().then(res => {
            let _loginStudent = res.data.students.find(student => student.id === this.loginuser.user.id);
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
            if(_loginStudent.assignmentGrades != null){
                this.setState({assinmentGrades: _loginStudent.assignmentGrades});
            }

        }).catch(error => {
            console.log('Failed to get login student',error)
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
                        <th>Professor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.loginStudent != null && this.state.loginStudent.courses != null &&
                    this.state.loginStudent.courses.length > 0 ? (
                        this.state.loginStudent.courses.map(course => (
                            <tr key={course.id}>
                                <td>{course.name}</td>
                             <td>Name:{course.professor.name} <br/> Email:{course.professor.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2}>No Course</td>
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


                <h5>Grade List</h5>
                <hr/>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Assignment</th>
                        <th>Grade</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.assinmentGrades != null &&
                    this.state.assinmentGrades.length > 0 ? (
                        this.state.assinmentGrades.map(assinmentGrade => (
                            <tr key={assinmentGrade.id}>
                                <td>{assinmentGrade.assignment.name}</td>
                                <td>{assinmentGrade.grade}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2}>No AssignmentGrade</td>
                        </tr>
                    )}
                    </tbody>
                </Table>


            </div>
        );
    }
}

export default StudentHome;