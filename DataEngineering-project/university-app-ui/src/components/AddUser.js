import React, {Component} from "react";
import instanceUserService from  '../services/UserService'
import {
    Form, Button
} from 'react-bootstrap'

class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            role: "Student",
            active: false
        };
        this.userService = instanceUserService;
    }


    onFormSubmit = event => {
        event.preventDefault();

        this.userService.createUser(event.target.name.value, event.target.email.value, event.target.role.value, event.target.password.value).then(res => {
            this.props.history.push('/users');
        }).catch(error => console.log('error in create user'));

        event.target.reset();

    };

    render() {
        return (
            <React.Fragment>
                <h5>Create User</h5>
                <hr/>
                <Form onSubmit={this.onFormSubmit.bind(this)}>
                    <Form.Group controlId="formUserName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder=""/>
                    </Form.Group>

                    <Form.Group controlId="formUserEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="email" placeholder=""/>
                    </Form.Group>

                    <Form.Group controlId="formUserEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password"/>
                    </Form.Group>


                    <Form.Group controlId="formRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Control as="select" name="role">
                            <option value="-1">Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Student">Student</option>
                            <option value="Faculty">Faculty</option>
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

export default AddUser;