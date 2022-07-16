import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
import  {Link} from 'react-router-dom'
import  instanceAssignmentService from "../services/AssignmentService"


class AssignmentTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            assignments: this.props.course.assignments,
            course: this.props.course
        };

        this.assignmentService = instanceAssignmentService;

    }


    deleteAssignment = (assignmentId) =>{
        this.assignmentService.deleteAssigment(assignmentId).then(res =>{
            console.log('Assignment deleted ')
        }).catch(error => console.log('error in create user'));

    }



    componentDidMount() {

    }

    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Title</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {this.state.assignments != null && this.state.assignments.length  ? (
                    this.state.assignments.map(assigment => (
                        <tr key={assigment.id}>
                            <td>{assigment.name}</td>
                            <td>
                                <Link to="/courses"
                                      onClick={() => this.deleteAssignment(assigment.id)}
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={3}>No Assigment</td>
                    </tr>
                )}
                </tbody>
            </Table>
        );
    }

}

export default AssignmentTable;