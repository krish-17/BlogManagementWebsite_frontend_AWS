import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import axios from "axios";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message.id === currentId) : null));
  let session = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const classes = useStyles();

  session = JSON.parse(localStorage.getItem("session"));
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      console.log(postData);
      const url = 'https://utwxc7sctk.execute-api.us-east-1.amazonaws.com/blog/posts';
      const headers = {
        headers : {
          Authorization: "Bearer eyJraWQiOiJSTEwrN2JaZkJSTkpjTUc4TVwvdlRcL1dmRVJidFpEbWxoSERTVDkxb2xBazA9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJmZmFlMDNmOC1hODM4LTQ3MjItOTNmMy1mMGZhNTQ0OTQyOTUiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGh0dHBzOlwvXC9ibG9nc2l0ZS5hdXRoLnVzLWVhc3QtMS5hbWF6b25jb2duaXRvLmNvbVwvYmxvZy5hbGwgZW1haWwiLCJhdXRoX3RpbWUiOjE2Mjc2MTI3MzQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX1kyYjdJN3VxdSIsImV4cCI6MTYyNzYxNjMzNCwiaWF0IjoxNjI3NjEyNzM0LCJ2ZXJzaW9uIjoyLCJqdGkiOiJjYmRjMWViNy1iNzEwLTQ3NWUtYTExNC05YjhiNjY5MjExNmQiLCJjbGllbnRfaWQiOiIxdmxmdjVrbTB2MWszZzgzNDBybzF0Zmg1ZSIsInVzZXJuYW1lIjoic3Jpa3Jpc2huYW4ifQ.BjAsa2AZoJVctIcyAbj7mDRZ-P8OeMGvpfJDQ5ls7IR7WUipEwltsmWpKO17kw6_AU9-_D8h_b1mtyjQsT7natqUUR8yyBX58KddJxh1BxU1GXLpovNtehAYa3wcEj7VPnhy7kFCJaPjd_Ntd10bxbgm4Vif8dW9su5FHjNVkPdLESlhD1fTM0battNCMAKHwpwO4-w41lJUiUzw_SngIM_9Tc1SSTumEb9hOAm_5E8VMQe-kVPSSQf6y_EIiyJj544SEPST0OG-GgXm9AW1hJo1ltFV5unGiT2Q_IS6Csm1NUrqveJ156XZ35dtakmYerKcNng62VxTwogXT5rBdA"
        }
      }
      axios.post(url + "/create", postData, headers).then((response, error) => {
        //console.log(response);
      });
      //dispatch(createPost(postData));
      clear();
      window.location.reload();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
      window.location.reload();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId && post ? `Editing "${post.title}"` : 'Creating a Blog'}</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={session.user.email} readonly onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags.toString()} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
