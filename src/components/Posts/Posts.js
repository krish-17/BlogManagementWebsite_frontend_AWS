import React from 'react';
import Post from './Post/Post';
import {Grid, CircularProgress} from '@material-ui/core';
import {useSelector} from 'react-redux';

import useStyles from './styles';

const Posts = ({setCurrentId, isLoggedIn}) => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    return (
        !posts.length ? <CircularProgress/> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        <Grid key={post.id} item xs={12} sm={6} md={6}>
                            <Post post={post} setCurrentId={setCurrentId} isLoggedIn={isLoggedIn}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
}


export default Posts;