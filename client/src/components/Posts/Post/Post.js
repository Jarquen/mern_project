import React from 'react';
import useStyles from './styles';
import {Card, CardActions, CardContent, Button, Typography, CardMedia} from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcom from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import * as api from '../../../api'
import {useDispatch} from "react-redux";
import {deletePost, likePost} from "../../../feature/postsSlice";

const Post = ({post, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const handleDelete = () => {
        try {
            api.deletePost(post._id).then(() => {
                dispatch(deletePost(post._id))
            });
        } catch (error) {
            console.log(error)
        }
    }

    const handleLike = () => {
        try {
            api.likePost(post._id).then(() => {
                dispatch(likePost(post._id))
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcom fontSize="medium"/>
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag}`)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="h5" gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => {
                    handleLike()
                }}>
                    <ThumbUpAltIcon fontSize="small"/>
                    Like
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => {
                    handleDelete()
                }}>
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default Post;