import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
import  {Link} from 'react-router-dom'


class GradeTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grades: this.props.grades,
        };
    }

    deleteGrade = (gradeId) =>{
    }


    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Assignment</th>
                    <th>Student</th>
                    <th>Grade</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {this.state.grades != null && this.state.grades.length  ? (
                    this.state.grades.map(grade => (
                        <tr key={grade.id}>
                            <td>{grade.assignmentName}</td>
                            <td>{grade.student}</td>
                            <td>{grade.grade}</td>
                            <td>
                                <Link to="#"
                                      onClick={() => this.deleteGrade(grade.id)}
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={4}>No Grade</td>
                    </tr>
                )}
                </tbody>
            </Table>
        );
    }

}

export default GradeTable;