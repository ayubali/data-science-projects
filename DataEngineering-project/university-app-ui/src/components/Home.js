import React, { Component } from "react";
import StudentHome from './StudentHome'
import  FacultyHome from './FacultyHome'
import  Users from  './Users'
import instanceAuthService from '../services/AuthService'

class Home extends Component {
    constructor(props) {
        super(props);
        this.Auth = instanceAuthService;
        this.loginuser = this.Auth.getLoginUser();
    }
    render() {
        if(this.loginuser.user.role === 'Faculty'){
            return (
                <div className="content">
                    <FacultyHome/>
                </div>

            );
        }
        else if(this.loginuser.user.role === 'Admin'){
            return (
                <div className="content">
                    <Users/>
                </div>

            );
        }else{
            return (
                <div className="content">
                    <StudentHome/>
                </div>

            );
        }



    }
}

export default Home;