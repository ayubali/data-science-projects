import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
import  {Link} from 'react-router-dom'
import  instanceUserService from "../services/UserService"

class UserTable extends Component {

    constructor(props) {
        super(props);
        this.userService = instanceUserService;
        this.state = {
            resolvedSuccess: false,
            users: [],
        };

    }

    componentDidMount() {
        this.userService.getUsers().then(res =>{
            this.setState({ resolvedSuccess: true, users: res.data.users})
        }).catch(error => this.setState({ resolvedSuccess: false, users: []}));
    }

    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {this.state.users.length  ? (
                    this.state.users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link to={`/users/${user.id}`} onClick={ () => this.props.parent.editUser(user)}>edit</Link>
                                &nbsp;&nbsp;&nbsp;
                                <Link to="/users"
                                    onClick={() => this.props.parent.deleteUser(user)}
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={3}>No users</td>
                    </tr>
                )}
                </tbody>
            </Table>
        );
    }

}

export default UserTable;