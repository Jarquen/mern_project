import React, {useEffect, useRef, useState} from 'react';
import useStyles from './styles';
import {TextField, Button, Typography, Paper} from "@material-ui/core";
import FileBase from "react-file-base64";
import {useDispatch} from "react-redux";
import * as api from '../../api'
import {createPost, updatePost} from "../../feature/postsSlice";
import {useSelector} from "react-redux";

const Form = ({currentId, setCurrentId}) => {
    const classes = useStyles();
    const [postData, setPostData] = useState({creator: '', title: '', message: '', tags: '', selectedFile: ''});
    const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const formRef = useRef();

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const clear = () => {
        setCurrentId(0);
        setPostData({creator: '', title: '', message: '', tags: '', selectedFile: ''})
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId !== 0) {
            api.updatePost(currentId, postData).then(() => {
                dispatch(updatePost(currentId, postData))
            }).then(clear());
            clear();
        } else {
            api.createPost(postData).then(() => {
                dispatch(createPost(postData))
            }).then(clear());
        }
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} ref={formRef}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator}
                           onChange={(e) => setPostData({...postData, creator: e.target.value})}/>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title}
                           onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message}
                           onChange={(e) => setPostData({...postData, message: e.target.value})}/>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}
                           onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}/>
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false}
                              onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large"
                            type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </div>
            </form>
        </Paper>
    );
};

export default Form;