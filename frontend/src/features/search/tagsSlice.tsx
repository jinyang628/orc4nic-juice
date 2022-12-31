import { createSlice } from "@reduxjs/toolkit";

const tagsSlice= createSlice({
    name: 'availableTags',
    initialState: ['Recipe', 'Orange', 'Apple', 'Cucumber', 'Bitter Gourd'],
    reducers: {
        chooseTags: (state, action) => action.payload,
    },
});

export const { chooseTags } = tagsSlice.actions;

export default tagsSlice.reducer;
