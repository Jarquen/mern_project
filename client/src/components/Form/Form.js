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
    const [postData, setPostData] = useState({title: '', message: '', tags: '', selectedFile: ''});
    const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const formRef = useRef();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const clear = () => {
        setCurrentId(0);
        setPostData({title: '', message: '', tags: '', selectedFile: ''})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId !== 0) {
            await api.updatePost(currentId, {...postData, name: user?.result?.name}).then((res) => {
                dispatch(updatePost(currentId, res.data))
            }).then(clear());
            clear();
        } else {
            await api.createPost({...postData, name: user?.result?.name}).then((res) => {
                dispatch(createPost(res.data))
            }).then(clear());
        }
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}
                  ref={formRef}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
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