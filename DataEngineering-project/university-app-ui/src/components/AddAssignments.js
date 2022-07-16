import React, { Component } from "react";
import {
    Form, Button
} from 'react-bootstrap'

import  instanceAssignmentService from "../services/AssignmentService"

class AddAssignments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: this.props.match.params.id,
            title:''
        };

        this.assignmentService = instanceAssignmentService
    }


    onFormSubmit = event => {
        event.preventDefault();

      this.assignmentService.createAssigment(this.state.courseId, event.target.title.value).then(res =>{
          console.log("created successfully..")
          this.props.history.push('/');
        }).catch(error => console.log('error in creating course'));



        event.target.reset();

    };

    render() {
            return (

                <React.Fragment>
                    <h5>Add assignment to course </h5>
                    <hr/>
                <Form onSubmit={this.onFormSubmit}>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" placeholder="Enter title"  />
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

export default AddAssignments;