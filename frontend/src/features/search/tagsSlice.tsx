import { createSlice } from "@reduxjs/toolkit";

const tagsSlice= createSlice({
    name: 'activeTags',
    initialState: [],
    reducers: {
        updateTags: (state, action) => {
            // return action.payload
            // console.log('before: ', state);
            const newState = action.payload;
            // console.log('after: ', newState);
            // this is correctly updated as an array 
            return newState;
        },
    },
});

export const { updateTags } = tagsSlice.actions;

export default tagsSlice.reducer;


