import React, { Component } from "react";
import  instanceCourseService from "../services/CourseService"
import  instanceUserService from "../services/UserService"
import {
    Form, Button
} from 'react-bootstrap'


class EditCourse extends Component {
    constructor(props) {
        super(props);


        this.userService = instanceUserService;
        this.courseService = instanceCourseService;

        this.state = {
            name: this.courseService.getCurrentCourse().name,
            facultyID:this.courseService.getCurrentCourse().professor.id,
            facultys:[]
        };
    }


    handleFacultyChange = event => {
        this.setState({facultyID: event.target.value});
    };


    componentDidMount() {
        this.userService.getUsers().then(res =>{
            this.setState({facultys: res.data.users.filter(user => user.role === 'Faculty' )})
        }).catch(error => this.setState({facultys: []}));
    }



    onFormSubmit = event => {
        event.preventDefault();

        this.courseService.createCourse(event.target.name.value, event.target.faultyId.value).then(res =>{
        }).catch(error => console.log('error in create course'));

        this.setState({
            name: "",
            facultyID:-1
        });

        event.target.reset();

    };
    render() {
        return (



        <React.Fragment>
            <h5>Edit course </h5>
            <hr/>


            <Form onSubmit={this.onFormSubmit.bind(this)}>
                <Form.Group controlId="formCourseName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" defaultValue={this.state.name} placeholder="Enter name"/>
                </Form.Group>

                <Form.Group controlId="formCourseFaculty">
                    <Form.Label>Faculty</Form.Label>
                    <Form.Control as="select" name="faultyId" value={this.state.facultyID} defaultValue={this.state.facultyID} onChange={this.handleFacultyChange} >
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

export default EditCourse;