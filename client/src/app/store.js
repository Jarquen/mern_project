import {configureStore} from "@reduxjs/toolkit";
import postsReducer, {authSlice} from '../feature/postsSlice'

export default configureStore({
    reducer: {
        posts: postsReducer,
        auth: authSlice.reducer
    }
});