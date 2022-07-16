import React, {Component} from "react";
import  instanceCourseService from "../services/CourseService"
import  instanceUserService from "../services/UserService"
import {
    Form, Button
} from 'react-bootstrap'

class AddCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            facultyID: -1,
            facultys: []
        };
        this.userService = instanceUserService;
        this.courseService = instanceCourseService;
    }

    componentDidMount() {
        this.userService.getUsers().then(res => {
            this.setState({facultys: res.data.users.filter(user => user.role === 'Faculty')})
        }).catch(error => this.setState({facultys: []}));
    }

    onFormSubmit = event => {
        event.preventDefault();

        this.courseService.createCourse(event.target.name.value, event.target.faultyId.value).then(res => {
            this.props.history.push('/courses');
            console.log('Course is added successfully')

        }).catch(error => console.log('error in create course'));

        event.target.reset();

    };

    render() {
        return (

            <React.Fragment>
                <h5>Add course </h5>
                <hr/>


                <Form onSubmit={this.onFormSubmit.bind(this)}>
                    <Form.Group controlId="formCourseName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter name"/>
                    </Form.Group>

                    <Form.Group controlId="formCourseFaculty">
                        <Form.Label>Faculty</Form.Label>
                        <Form.Control as="select" name="faultyId">
                            <option value="-1">Select Faculty</option>
                            {

                                this.state.facultys.map(faulty => (
                                    <option key={faulty.id} value={faulty.id}>{faulty.name}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>

                        <Button variant="outline-primary" type="submit">
                            Save
                        </Button>
                        <hr />

                </Form>
            </React.Fragment>
        );
    }
}

export default AddCourse;