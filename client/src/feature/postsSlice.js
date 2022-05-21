import {createSlice} from '@reduxjs/toolkit'

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: null
    },
    reducers: {
        getPosts: (state, {payload}) => {
            state.posts = payload;
        }
    }
});

export const {getPosts} = postsSlice.actions
export default postsSlice.reducer;