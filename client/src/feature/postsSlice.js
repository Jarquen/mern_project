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
        getPostsBySearch: (state, {payload}) => {
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
            state.posts = state.posts.map((post) => (post._id === payload._id ? payload : post))
        }
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        posts: null
    },
    reducers: {
        authentication: (state = {authData: null}, action) => {
            localStorage.setItem('profile', JSON.stringify({...action?.payload}));
        },
        disconnection: () => {
            localStorage.clear();
        }
    }
});

export const {getPosts, getPostsBySearch, createPost, updatePost, deletePost, likePost} = postsSlice.actions
export const {authentication, disconnection} = authSlice.actions

export default postsSlice.reducer;