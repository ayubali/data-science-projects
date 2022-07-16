import React, { Component } from "react";
import  instanceCourseService from "../services/CourseService"
import  instanceUserService from "../services/UserService"
import {
    Form, Button
} from 'react-bootstrap'

class AddCourseToStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_student_id: -1,
            selected_course_id:-1,
            students:[],
            courses:[]
        };
        this.userService = instanceUserService;
        this.courseService = instanceCourseService;
    }

    componentDidMount() {
        this.userService.getStudents().then(res =>{
            console.log(res);
            this.setState({students: res.data.students})
        }).catch(error => {
            console.log('error',error)
            this.setState({students: []})
        });


        this.courseService.getCourses().then(res =>{
            this.setState({courses: res.data.courses})
        }).catch(error => this.setState({courses: []}));
    }

    onFormSubmit = event => {
        event.preventDefault();
        this.courseService.addCourseToStudent(event.target.selected_course_id.value, event.target.selected_student_id.value).then(res => {
            console.log("added successfully.")
            this.props.history.push('/courses');
        }).catch(error => console.log('error in create course'));

        event.target.reset();

    };


    render()  {
        return (

            <React.Fragment>
                <h5>Assign course to Student </h5>
                <hr/>
                <Form onSubmit={this.onFormSubmit.bind(this)}>

                    <Form.Group controlId="formStudentId">
                        <Form.Label>Student</Form.Label>
                        <Form.Control as="select" name="selected_student_id">
                            <option value="-1">Select Student</option>
                            {

                                this.state.students.map(student => (
                                    <option key={student.id} value={student.id}>{student.name}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formCourseId">
                        <Form.Label>Course</Form.Label>
                        <Form.Control as="select" name="selected_course_id">
                            <option value="-1">Select Course</option>
                            {

                                this.state.courses.map(course => (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                ))
                            }
                        </Form.Control>
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

export default AddCourseToStudent;