import {configureStore} from "@reduxjs/toolkit";
import postsReducer from '../feature/postsSlice'

export default configureStore({
    reducer: {
        posts: postsReducer,
    }
})