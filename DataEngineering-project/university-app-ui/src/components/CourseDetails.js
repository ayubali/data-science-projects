import React, { Component } from "react";
import  instanceCourseService from "../services/CourseService"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import  {Link} from 'react-router-dom'
import  AssignmentTable from './AssignmentTable'
import  CourseStudentTable from './CourseStudentTable'
import instanceAuthService from '../services/AuthService'
import GradeTable from './GradeTable'

class CourseDetails extends Component {
    constructor(props) {
        super(props);

        this.courseService = instanceCourseService;

        this.state = {
            currentCourse: this.courseService.getCurrentCourse(),
            grades: []
        };

        this.Auth = instanceAuthService;
        this.loginuser = this.Auth.getLoginUser();

        console.log(this.state.currentCourse)

        let _grades = [];
        for(const student of this.state.currentCourse.students){
            if(student.assignmentGrades != null) {
                for (const _grade of student.assignmentGrades) {
                    let grade = {
                        id: _grade.id,
                        assignmentName: _grade.assignment.name,
                        grade: _grade.grade,
                        student: student.name
                    };
                    _grades.push(grade)
                }
            }
        }


        this.g_grades=_grades;

    }


    componentDidMount() {
    }
    render() {
        return (
            <div>
                <h5>Course Details</h5>
                <hr/>
                <React.Fragment>
                    <Row>
                        <Col><b> Course Title:</b> </Col>
                        <Col>{this.state.currentCourse.name} </Col>
                    </Row>

                    <Row>
                        <Col><b> Faculty:</b> </Col>
                        <Col>{this.state.currentCourse.professor.name}({this.state.currentCourse.professor.email}) </Col>
                    </Row>

                    <Row>
                        <Col>
                            {this.loginuser.user.role === 'Faculty' &&  <Link to={`/courses/${this.state.currentCourse.id}/assignment/new`}>Add assignment</Link>}
                            <br/>
                            {this.loginuser.user.role === 'Faculty' && <Link to={`/courses/${this.state.currentCourse.id}/assignment/grade`}>Assign grade</Link>}
                            </Col>
                    </Row>
                </React.Fragment>
                <hr/>
                <h5>Assignment List</h5>
                <AssignmentTable  course={this.state.currentCourse}  />
                <hr/>
                <h5>Student List</h5>
                <CourseStudentTable students={this.state.currentCourse.students}/>
                <hr/>
                <h5>Grade List</h5>
                <GradeTable grades={this.g_grades} ></GradeTable>


            </div>
        );
    }
}

export default CourseDetails;