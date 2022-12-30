import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {createPostAsync} from './postSlice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

function PostForm() {
  const dispatch = useDispatch<ThunkDispatch<{}, void, AnyAction>>();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  function submitHandler(e:any) {
    e.preventDefault();
    const formData = {
      post: {
        title: title,
        body: body,
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
        onClick={(e) => submitHandler(e)}>Submit</button>
    </form>
  </div>;
}

export default PostForm;
