import React, { Component } from "react";
import  instanceUserService from "../services/UserService"
import {
    Form, Button
} from 'react-bootstrap'

class EditUser extends Component {

    constructor(props) {
        super(props);

        this.userService = instanceUserService;

        this.state = {
            id: this.userService.getCurrentUser().id,
            name: this.userService.getCurrentUser().name,
            email: this.userService.getCurrentUser().email,
            role: this.userService.getCurrentUser().role,
            active: false
        };
    }



    componentDidMount() {

    }


    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    handleRoleChange = event => {
        this.setState({role: event.target.value});
    };

    handleStatusChange = event => {
        this.setState({active:event.target.checked});
    };

    onFormSubmit = event => {
        event.preventDefault();
        this.userService.updateUser(this.state.id, event.target.name.value, event.target.email.value, event.target.role.value, event.target.password.value).then(res =>{
            this.props.history.push('/users');
        }).catch(error => console.log('error in updating user'));

        this.props.history.push('/users');
        event.target.reset();
    };

    render(){
        return (

        <React.Fragment>
            <h5>Update User</h5>
            <hr/>
            <Form onSubmit={this.onFormSubmit.bind(this)}>
                <Form.Group controlId="formUserName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" defaultValue={this.state.name} placeholder=""/>
                </Form.Group>

                <Form.Group controlId="formUserEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name="email" defaultValue={this.state.email} placeholder=""/>
                </Form.Group>

                <Form.Group controlId="formUserEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" defaultValue={this.state.password} name="password"/>
                </Form.Group>


                <Form.Group controlId="formRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control as="select" name="role" value={this.state.role} defaultValue={this.state.role} onChange={this.handleRoleChange}>
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

export default EditUser;