import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import produce from "immer";
import { RootState } from "../../app/store"
import { fetchPosts, createPost, destroyPost, updatePost } from './postAPI'

export enum Statuses {
    Initial = "Not Fetched",
    Loading = "Loading...",
    UpToDate = "Up To Date",
    Deleted = "Deleted",
    Error = "Error"
}

export interface PostFormData {
    post: {
        id?: string;
        title: string;
        body: string;
        tags: string[];
        username: string;
    }
}

export interface PostState {
    id?: number;
    title?: string;
    body?: string;
    tags?: string[];
    username?: string;
    created_at?: any;
    updated_at?: any;
}

export interface PostsState {
    posts: PostState[];
    status: string;
}

export interface PostUpdateData {
    post_id: number;
    post: PostState;
}

export interface PostDeleteData {
    post: {
        post_id: number;
    }
}

const initialState: PostsState = {
    posts: [
        {
            id: 0,
            title: "",
            body: "",
            tags: [],
            username: "",
            created_at: "",
            updated_at: "",
        }
    ],
    status: Statuses.Initial
}

export const fetchPostsAsync = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await fetchPosts();
        return response;
    }
)

//createPostAsync is an async thunk that makes an API call to create a new post 
export const createPostAsync = createAsyncThunk(
    'posts/createPost',
    //receives a PostFormData object as payload, which contains the data for the new post
    async (payload: PostFormData) => {
        const response = await createPost(payload);
        //when the action is dispatched, it returns a promise that resolves to the API response
        return response;
    }
)
export const updatePostAsync = createAsyncThunk(
    'posts/updatePost',
    async (payload: PostFormData) => {
        const response = await updatePost(payload);

        return response;
    }
)
export const destroyPostAsync = createAsyncThunk(
    'posts/destroyPost',
    async (payload: PostDeleteData) => {
        const response = await destroyPost(payload);

        return response;
    }
)

export const postSlice = createSlice({
    name: "posts",
    initialState,
    /*Synchronous actions*/
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                })
            })
            .addCase(fetchPostsAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.posts = action.payload;
                    draftState.status = Statuses.UpToDate;
                })
            })            
            .addCase(fetchPostsAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Error;
                })
            })
            
            /** Create Section */
            //pending status mean the API call is still being made
            .addCase(createPostAsync.pending, (state) => {
                // status field in the state will be set to Statuses.Loading
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                })
            })
            //fulfilled status means the API call has completed successfully and 
            //action has received a response
            .addCase(createPostAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    //new post data from the action's payload will be added to the posts array in the state
                    draftState.posts.push(action.payload);
                    //status filed in the state will be set to Statuses.UpToDate
                    draftState.status = Statuses.UpToDate;
                })
            })       
            //rejected status means the API call has failed     
            .addCase(createPostAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    //status filed in the state will be set to Statuses.Error
                    draftState.status = Statuses.Error;
                })
            })

            /** Destroy Section */
            .addCase(destroyPostAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                })
            })
            .addCase(destroyPostAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.posts = action.payload;
                    draftState.status = Statuses.UpToDate;
                })
            })            
            .addCase(destroyPostAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Error;
                })
            })

            /** Update Section */
            .addCase(updatePostAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                })
            })
            .addCase(updatePostAsync.fulfilled, (state, action) => {
                const { id, tags } = action.payload;
                const index = state.posts.findIndex(post => post.id === id);
                return produce(state, (draftState) => {
                  draftState.posts[index].tags = tags;
                  draftState.status = Statuses.UpToDate;
                });
              })          
            .addCase(updatePostAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Error;
                })
            })
    }
})

export const {} = postSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;

export const selectStatus = (state: RootState) => state.posts.status;

export default postSlice.reducer;