import React, {Component} from "react"
import  instanceUserService from "../services/UserService"
import  {Link} from 'react-router-dom'
import  UserTable from './UserTable'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Users extends Component {

    constructor(props) {
        super(props);
        this.userService =  instanceUserService;

    }

    deleteUser = (user) => {
        console.log('deleteUser', user);
        this.userService.setCurrentUser(user);
    }

    editUser = (user) => {
        console.log("editUser", user);
        this.userService.setCurrentUser(user);
    }


    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col><UserTable parent={this}></UserTable> </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to={`/users/add/new`}>Add new user</Link>
                    </Col>
                </Row>

            </React.Fragment>

        );
    }


}

export default Users;