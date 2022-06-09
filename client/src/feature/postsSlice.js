import {createSlice} from '@reduxjs/toolkit'


export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: {},
        isLoading: true,
    },
    reducers: {
        startLoading: (state, {payload}) => {
            state.isLoading = true;
        },
        getPost: (state, {payload}) => {
            state.post = payload;
            state.isLoading = false;
        },
        getPosts: (state, {payload}) => {
            state.posts = payload.data;
            state.currentPage = payload.currentPage;
            state.numberOfPages = payload.numberOfPages;
            state.isLoading = false;
        },
        getPostsBySearch: (state, {payload}) => {
            state.posts = payload.data;
            state.isLoading = false;
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
        },
        commentPost: (state, {payload}) => {
            state.posts = state.posts.map((post) => {
                if (post._id === payload._id) {
                    return payload;
                }
                return post;
            })
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

export const {startLoading, getPost, getPosts, getPostsBySearch, createPost, updatePost, deletePost, likePost, commentPost} = postsSlice.actions
export const {authentication, disconnection} = authSlice.actions

export default postsSlice.reducer;