import React, { Component } from "react";
import {
    Form, Button
} from 'react-bootstrap'

import  instanceAssignmentService from "../services/AssignmentService"
import  instanceCourseService from "../services/CourseService"
import  instanceUserService from "../services/UserService"

class AssignGrade extends Component {
    constructor(props) {
        super(props);
        this.courseService = instanceCourseService;
        this.state = {
            courseId: this.props.match.params.id,
            students:this.courseService.getCurrentCourse().students,
            assignments:this.courseService.getCurrentCourse().assignments
        };

        this.assignmentService = instanceAssignmentService;
        this.userService = instanceUserService;

    }

    componentDidMount() {
        /*this.userService.getStudents().then(res =>{
            console.log("res", res)
            this.setState({students: res.data.students})
        }).catch(error => {console.log('failed to get students')});*/

      console.log(this.courseService.getCurrentCourse())

    }

    onFormSubmit = event => {
        event.preventDefault();

        this.assignmentService.createAssigmentGrade(event.target.selected_Assignment_id.value, event.target.selected_student_id.value,
            Number(event.target.grade.value)).then(res =>{
            console.log("created successfully..")
            this.props.history.push('/');
        }).catch(error => console.log('error in creating course'));



        event.target.reset();

    };

    render() {
        return (

            <React.Fragment>
                <h5>Assign grade to Student </h5>
                <hr/>
                <Form onSubmit={this.onFormSubmit}>

                    <Form.Group controlId="formAssignmentId">
                        <Form.Label>Assignment</Form.Label>
                        <Form.Control as="select" name="selected_Assignment_id">
                            <option value="-1">Select assignment</option>
                            {


                                this.state.assignments != null && this.state.assignments.map(assignment => (
                                    <option key={assignment.id} value={assignment.id}>{assignment.name}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formStudentId">
                        <Form.Label>Student</Form.Label>
                        <Form.Control as="select" name="selected_student_id">
                            <option value="-1">Select Student</option>
                            {

                                this.state.students != null && this.state.students.map(student => (
                                    <option key={student.id} value={student.id}>{student.name}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formStudentId">
                        <Form.Label>Grade</Form.Label>
                        <Form.Control type="number" name="grade"  step="0.1" placeholder="grade"  />
                    </Form.Group>


                    <br/>
                    <Button variant="outline-primary" type="submit">
                        Save
                    </Button>
                    <hr />
                </Form>
            </React.Fragment>
        );
    }
}

export default AssignGrade;