import React, {useEffect, useState} from 'react';
import {Container, Grid, Grow} from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import {useDispatch} from "react-redux";
import * as api from "../../api";
import {getPosts} from "../../feature/postsSlice";

const Home = () => {
    const [currentId, setCurrentId] = useState(0)
    const dispatch = useDispatch();

    useEffect(() => {
        api.fetchPosts().then((res) => dispatch(getPosts(res.data)));
    }, [dispatch, currentId])

    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;