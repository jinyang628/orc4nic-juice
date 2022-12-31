import { createSlice } from "@reduxjs/toolkit";

const signInSlice = createSlice({
    name: 'signedIn',
    initialState: false,
    reducers: {
        setSignedIn: (state, action) => action.payload,
    },
});

export const { setSignedIn } = signInSlice.actions;

export default signInSlice.reducer;


/*
    name: This is a string that represents the name of the slice. This is used to namespace the slice's actions and reducer.

    initialState: This is the initial value of the slice's state. In this case, the initial state is false, meaning that the user is not signed in when the app first loads.

    reducers: This is an object that contains the reducer functions for this slice. A reducer is a function that takes in the current state and an action, and returns the next state based on the action. In this case, there is only one reducer function, setSignedIn, which sets the signed in status to the value passed in the payload field of the action.

    signInSlice.actions: This is an object containing the action creators for this slice. An action creator is a function that creates and returns an action. In this case, there is only one action creator, setSignedIn, which creates an action with the type field set to signedIn/setSignedIn and the payload field set to the value passed to the action creator.

    signInSlice.reducer: This is the root reducer function for this slice. It handles the setSignedIn action by updating the state with the value passed in the payload field of the action.
*/