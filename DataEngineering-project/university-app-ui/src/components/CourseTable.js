import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
import  {Link} from 'react-router-dom'
import  instanceCourseService from "../services/CourseService"

class CourseTable extends Component {

    constructor(props) {
        super(props);
        this.courseService = instanceCourseService;
        this.state = {
            resolvedSuccess: false,
            courses: [],
        };

    }

    componentDidMount() {
        this.courseService.getCourses().then(res =>{
            this.setState({ resolvedSuccess: true, courses: res.data.courses})
        }).catch(error => this.setState({ resolvedSuccess: false, courses: []}));
    }

    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Faculty</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {this.state.courses.length  ? (
                    this.state.courses.map(course => (
                        <tr key={course.id}>
                            <td> <Link to={`/courses/${course.id}`} onClick={ () => this.props.parent.selectCourse(course)} >{course.name}</Link></td>
                            <td>{course.professor.name}</td>
                            <td>
                                <Link to={`/courses/edit/${course.id}`} onClick={ () => this.props.parent.editCourse(course)}>edit</Link>
                                &nbsp;&nbsp;&nbsp;
                                <Link to="/courses"
                                      onClick={() => this.props.parent.deleteCourse(course)}
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={3}>No Course</td>
                    </tr>
                )}
                </tbody>
            </Table>
        );
    }

}

export default CourseTable;