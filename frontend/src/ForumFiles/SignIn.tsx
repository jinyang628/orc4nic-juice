import React from 'react';
import { useState } from 'react';
import PostForm from '../features/posts/PostForm';
import { useDispatch } from 'react-redux';
import { setSignedIn } from '../features/signIn/signInSlice';
import { setActiveUsername } from '../features/signIn/usernameSlice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

export default function SignIn(){
    const [username, setUsername] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const dispatch = useDispatch<ThunkDispatch<{}, void, AnyAction>>();
    // boiler plate code just copy and paste

    function handleClick(){
        const newMessage = "You are signed in as: " + username;
        const status = document.querySelector('#signInStatus') as HTMLInputElement;
        status.innerHTML = newMessage;
        dispatch(setSignedIn(true));
        /*
            I want to set signedIn to true
            I dispatch the setSignedIn action with a payload of true
            The reducer in signInSlice would then update the signedIn value in the state to true.
        */
        dispatch(setActiveUsername(username));
    }
    
    function handleUsernameChange(event: any){
        const username = event.target.value;
        setUsername(username);
        setIsButtonDisabled(!username);
    }

    return (
        <div className = "usernameContainer">
            <div className="usernameForm">
                <h2 className="usernamePrompt">Sign in to join the conversation!</h2>
                <input 
                    className="formInput" 
                    type="text" 
                    placeholder="Username"
                    onChange={handleUsernameChange}
                />
                <button 
                    onClick={handleClick} 
                    className="signInButton clickableButton"
                    disabled={isButtonDisabled}>
                    Sign in
                </button>
                <h3 id="signInStatus" className="signInStatus">You have yet to sign in</h3>
            </div>
        </div>
    )
}