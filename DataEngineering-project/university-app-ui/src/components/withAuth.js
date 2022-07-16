import React, { Component } from "react";
import instanceAuthService from '../services/AuthService'

/* A higher order component is frequently written as a function that returns a class. */
export default function withAuth(AuthComponent) {
    const Auth = instanceAuthService;

    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: null
            }
        }

        /* In the componentDid<ount, we would want to do a couple of important tasks in order to verify the current users authentication status
         prior to granting them enterance into the app. */
        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login')
            }
            else {
                try {
                    const profile = Auth.getProfile()
                    this.setState({
                        user: profile
                    })
                }
                catch(err){
                    Auth.logout()
                    this.props.history.replace('/login')
                }
            }
        }

        render() {
            if (this.state.user) {
                return (
                    <AuthComponent history={this.props.history} user={this.state.user} />
                )
            }
            else {
                return null
            }
        }
    };
}
