import React, {Component} from 'react'
import {connect} from 'react-redux'
import {initSessionFromCallbackURI} from '../actions/session'
import { Router, Redirect} from 'react-router-dom'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

function mapStateToProps(state) {
    return {session: state.session}
}

function mapDispatchToProps(dispatch) {
    return {
        initSessionFromCallbackURI: href => dispatch(initSessionFromCallbackURI(href))
    }
}

/**
 Callback route used after a successful Cognito sign-in. The window URL will contain the code we can
 use to get a Cognito session, which includes JWT tokens etc
 */
class Callback extends Component {
    // If a Cognito auth code is in the URL (could be a hash or query component), init the new session
    componentDidMount() {
        if (this.props.location.hash || this.props.location.search) {
            this.props.initSessionFromCallbackURI(window.location.href)
        }
    }

    render() {
        // If there's no auth code in the URL or we're now logged into, redirect to the root page
        if ((!this.props.location.hash && !this.props.location.search) || this.props.session.isLoggedIn) {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("session", JSON.stringify(this.props.session));
            return (
                <Router history={history}>
                    <Redirect to="/"/>
                </Router>

            )
        }
        return <div/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Callback)