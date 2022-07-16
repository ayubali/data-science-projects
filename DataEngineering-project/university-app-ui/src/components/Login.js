import React, {Component} from "react";
import  './login.css'
import  {Link, BrowserRouter} from 'react-router-dom'
import {
    Form
} from 'react-bootstrap'

import {
    withRouter
} from 'react-router-dom'
import instanceAuthService from '../services/AuthService'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
        this.Auth = instanceAuthService;
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});


    onSubmit = event => {
        event.preventDefault();
        this.Auth.login(this.state.email, this.state.password)
            .then(res =>{
                this.props.history.push('/');
            })
            .catch(err =>{
                alert(err);
            })

        this.props.history.push('/');
    };

    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.push('/');
    }

    render() {
        return (  <div className="login-form">
                <Form onSubmit={this.onSubmit}>
                    <div className="avatar">
                        <img src="avatar.png" alt="Avatar"/>
                    </div>
                    <h2 className="text-center">Member Login</h2>

                    <div className="form-group">
                        <input type="text" className="form-control" name="email" placeholder="Email"
                               required="required" value={this.state.email} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" placeholder="Password"
                               required="required" value={this.state.password} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>
                    </div>
                    <div className="clearfix">
                        <label className="pull-left checkbox-inline"><input type="checkbox"/> Remember me</label>
                        <br/>
                        <BrowserRouter>
                            <Link to="#" className="pull-right">Forgot Password?</Link>
                        </BrowserRouter>

                    </div>
                </Form>
            </div>
        )
    }

}
export default withRouter(Login);
