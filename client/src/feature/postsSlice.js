import {createSlice} from '@reduxjs/toolkit'

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: {}
    },
    reducers: {
        getPosts: (state, {payload}) => {
            state.posts = payload;
        },
        createPost: (state, {payload}) => {
            state.posts.push(payload);
        },
        updatePost: (state, {payload}) => {
            state.posts = state.posts.map((post) => (post._id === payload[0] ? payload : post));
        },
        deletePost: (state, {payload}) => {
            state.posts = state.posts.filter((post) => post._id !== payload);
        },
        likePost: (state, {payload}) => {
            state.posts = this.state.posts.map((post) => (post._id === payload[0] ? payload: post))
        }
    }
});

export const {getPosts, createPost, updatePost, deletePost, likePost} = postsSlice.actions
export default postsSlice.reducer;