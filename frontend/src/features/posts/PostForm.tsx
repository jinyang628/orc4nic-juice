import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createPostAsync} from './postSlice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

function PostForm() {
  const dispatch = useDispatch<ThunkDispatch<{}, void, AnyAction>>();
  const signedIn = useSelector((state: RootState) => state.signedIn);
  const activeUsername = useSelector((state: RootState) => state.activeUsername);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  function submitHandler(e:any) {
    e.preventDefault();
    const formData = {
      post: {
        title: title,
        body: body,
        username: activeUsername,
      }
    }
    dispatch(createPostAsync(formData));
    resetState();
  }

  function resetState() {
    setTitle('');
    setBody('');
  }
  
  return <div>
    <form>
      <input
        type="text"
        className="form-control"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
      <textarea
        className="form-control"
        name="body"
        placeholder="Content"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        />
      <button
        type="submit"
        className="submitButton clickableButton"
        disabled={!title || !body || !signedIn}
        onClick={(e) => submitHandler(e)}>Submit</button>
    </form>
  </div>;
}

export default PostForm;
