import React, {Component} from 'react';
import './App.css';

import withAuth from './components/withAuth';
import {
    Route,
} from "react-router-dom";
import Home from "./components/Home";
import Stuff from "./components/Stuff";
import Contact from "./components/Contact";
import {BrowserRouter as Router} from 'react-router-dom';
import {Container, Navbar} from 'react-bootstrap';
import  {Link} from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Users from './components/Users'
import EditUser from './components/EditUser'
import AddUser from  './components/AddUser'
import Courses from  './components/Courses'
import AddCourse from './components/AddCourse'
import EditCourse from './components/EditCourse'
import AddCourseToStudent from  './components/AddCourseToStudent'
import Assignments from  './components/Assignments'
import CourseDetails  from  './components/CourseDetails'
import AddAssignments from './components/AddAssignments'
import AssignGrade from './components/AssignGrade'
import instanceAuthService from "./services/AuthService"


class App extends Component {

    constructor(props) {
        super(props);
        this.Auth = instanceAuthService;
        this.loginuser = this.Auth.getLoginUser();
    }

    handleLogout() {
        this.Auth.logout();
        this.props.history.replace('/login');
    }

    render() {
        return (
            <Router>
                <Navbar fixed="top" collapseOnSelect expand="lg" bg="light" variant="light">
                   <Navbar.Brand href="/">{this.loginuser.user.role} Dashboard</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                           Signed in as <a href="#login">{this.loginuser.user.name}</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                <Container fluid>
                    <Row style={{marginTop: '8px'}}>
                        <Col sm={2}>
                            <div style={{display: 'flex'}}>
                                <div style={{
                                    padding: '10px',
                                    width: '100%',
                                    background: '#f0f0f0'
                                }}>
                                    <ul style={{listStyleType: 'none', padding: 0}}>
                                        <li><Link to="/">Home</Link></li>
                                        {this.loginuser.user.role === 'Admin' && <li><Link to="/users">Users</Link></li>}
                                        {this.loginuser.user.role === 'Admin' && <li><Link to="/courses">Courses</Link></li>}
                                        <li><Link to="/contact">About us</Link></li>
                                    </ul>

                                    <ul style={{listStyleType: 'none', padding: 0}}>
                                        <li><Link to="" onClick={this.handleLogout.bind(this)}>Logout</Link></li>
                                    </ul>

                                </div>
                            </div>
                        </Col>

                        <Col sm={10}>
                            <div className="content">
                                <Route exact path="/" component={Home}/>
                                <Route path="/stuff" component={Stuff}/>
                                <Route path="/contact" component={Contact}/>
                                <Route exact path="/users" component={Users}/>
                                <Route exact path="/users/:id" component={EditUser}/>
                                <Route exact path="/users/add/new" component={AddUser}/>
                                <Route exact path="/courses" component={Courses}/>
                                <Route exact path="/courses/add/new" component={AddCourse}/>
                                <Route exact path="/courses/edit/:id" component={EditCourse}/>
                                <Route exact path="/courses/:id" component={CourseDetails}/>
                                <Route exact path="/courses/:id/assignment/new" component={AddAssignments}/>
                                <Route exact path="/addCourseToStudent" component={AddCourseToStudent}/>
                                <Route exact path="/assignments" component={Assignments}/>
                                <Route exact path="/courses/:id/assignment/grade" component={AssignGrade}/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Router>
        );
    }
}


//export default App;
export default withAuth(App);
