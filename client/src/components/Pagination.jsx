import React, {useEffect} from 'react';
import {Pagination, PaginationItem} from "@material-ui/lab";

import useStyles from './styles';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPosts, startLoading} from "../feature/postsSlice";
import * as api from "../api";

const Paginate = ({page}) => {
    const {numberOfPages} = useSelector((state) => state.posts)
    const classes = useStyles()
    const dispatch = useDispatch()

    const fetchPosts = async () => {
        await api.fetchPosts(page).then((res) => dispatch(getPosts(res.data)));
    }

    useEffect( () => {
        dispatch(startLoading());
        if (page) {
            fetchPosts()
        }
    }, [page, dispatch])

    return (
        <Pagination
            classes={{ul: classes.ul}}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
            )}
        />
    );
};

export default Paginate;