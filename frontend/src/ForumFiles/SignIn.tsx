import React from 'react';
import { useState } from 'react';

export default function SignIn(){
    const [signedIn, setSignedIn] = useState(false);

    function handleClick(){
        const usernameInput = document.querySelector('.formInput') as HTMLInputElement;
        const username = usernameInput.value;
        if (username != ""){
            const newMessage = "You are signed in as: " + username;
            const status = document.querySelector('#signInStatus') as HTMLInputElement;
            status.innerHTML = newMessage;
            setSignedIn(true);
        }
        
    }
    
    return (
        <div className = "usernameContainer">
            <div className="usernameForm">
                <h2 className="usernamePrompt">Sign in to join the conversation!</h2>
                <input className="formInput" type="text" placeholder="Username"></input>
                <button onClick={handleClick} className="signInButton clickableButton">Sign in</button>
                <h3 id="signInStatus" className="signInStatus">You have yet to sign in</h3>
            </div>
        </div>
    )
}