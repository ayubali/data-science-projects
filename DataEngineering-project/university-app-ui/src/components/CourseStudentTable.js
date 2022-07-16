import React, { Component } from "react";
import Table from 'react-bootstrap/Table'

class CourseStudentTable extends Component {

    constructor(props) {
        super(props);
        this.students = this.props.students;
    }

    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {this.students != null && this.students.length  ? (
                    this.students.map(user => (
                    <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    </tr>
                    ))
                    ) : (
                    <tr>
                    <td colSpan={3}>No Students</td>
                    </tr>
                    )}
                </tbody>
            </Table>
        );
    }

}

export default CourseStudentTable;