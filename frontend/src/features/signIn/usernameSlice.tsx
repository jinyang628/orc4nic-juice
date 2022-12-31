import { createSlice } from "@reduxjs/toolkit";

const usernameSlice= createSlice({
    name: 'activeUsername',
    initialState: '',
    reducers: {
        setActiveUsername: (state, action) => action.payload,
    },
});

export const { setActiveUsername } = usernameSlice.actions;

export default usernameSlice.reducer;
