import {AppBar, Container, Grid, Grow, Typography} from "@material-ui/core";
import memories from "../images/memories.png";
import cognitoUtils from "../lib/cognitoUtils";
import Posts from "../components/Posts/Posts";
import Form from "../components/Form/Form";
import React, {useEffect, useState} from "react";
import useStyles from "../styles";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../actions/posts";


function LandingPage() {

    const [currentId, setCurrentId] = useState(0);
    const classes = useStyles();
    let session = useSelector((state) => state.session);
    const dispatch = useDispatch();
    useEffect(() => {
        let token = "";
        if(localStorage.getItem("isLoggedIn")) {
            if (session && session.credentials && session.credentials.accessToken) {
                token = session.credentials.accessToken;
                localStorage.setItem("jwtToken", session.credentials.accessToken);
            }
        }
        console.log(token);
        dispatch(getPosts());
    }, [currentId, dispatch]);

    function onSignOut(e) {
        e.preventDefault();
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
        localStorage.removeItem("session");
        cognitoUtils.signOutCognitoSession();
    }

    let loginButtonHTML = [];
    let showForm = [];
    session = JSON.parse(localStorage.getItem("session"));
    console.log(session);
    if ((session && session.isLoggedIn) || localStorage.getItem("jwtToken")) {
        loginButtonHTML.push(
            <div>
                <p>  Welcome {session.user.userName}</p>
                <a className="Home-link" href="/" onClick={onSignOut}>Sign out</a>
            </div>
        );
        showForm.push(
            <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
        );
    } else {
        loginButtonHTML.push(
            <a href={cognitoUtils.getCognitoSignInUri()}> Login </a>
        );
    }
    if (session && session.credentials && session.credentials.accessToken) {
        localStorage.setItem("jwtToken", session.credentials.accessToken);
    }

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">PARSS</Typography>
                <img className={classes.image} src={memories} alt="icon" height="60"/>
                {loginButtonHTML}
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} isLoggedIn={session && session.isLoggedIn}/>
                        </Grid>
                        {showForm}
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default LandingPage;