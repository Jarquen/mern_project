import {createSlice} from '@reduxjs/toolkit'

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: null
    },
    reducers: {
        getPosts: (state, {payload}) => {
            state.posts = payload;
        },
        createPost: (state, {payload}) => {
            state.posts.push(payload);
        }
    }
});

export const {getPosts, createPost} = postsSlice.actions
export default postsSlice.reducer;