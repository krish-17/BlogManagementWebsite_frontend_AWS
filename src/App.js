import React from 'react';
import {Router, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Callback from './routes/CallBackComponent';
import LandingPage from "./routes/LandingPage";

const history = createBrowserHistory();

const App = () => {
    return (
        <Router history={history}>
            <Route path="/" component={LandingPage}/>
            <Route exact path="/callback" component={Callback}/>
            <Route exact path={"/signout"}>
            </Route>
        </Router>
    );
};

export default App;
