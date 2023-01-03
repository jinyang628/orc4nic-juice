import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createPostAsync} from './postSlice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import TagsSearch from '../search/tagsSearch';

function PostForm() {
  const dispatch = useDispatch<ThunkDispatch<{}, void, AnyAction>>();
  const signedIn = useSelector((state: RootState) => state.signedIn);
  const activeUsername = useSelector((state: RootState) => state.activeUsername);
  const activeTags = useSelector((state: RootState) => {
    //i should see an array of the currently selected tags but i dont
    // console.log(state.activeTags);
    return state.activeTags
  });

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  // const [tags, setTags] = useState([]);

  function submitHandler(e:any) {
    e.preventDefault();
    // ERROR debugging delete later
    // i should see an array of the currently selected tags but i dont
    // console.log(activeTags);
    const formData = {
      post: {
        title: title,
        body: body,
        username: activeUsername,
        tags: activeTags,
      }
    }
    dispatch(createPostAsync(formData));
    resetState();
  }

  function resetState() {
    setTitle('');
    setBody('');
    // setTags([]);
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
      <TagsSearch
        purpose="setTags"
        //if i add this i need to modify TagsSearch as well)
      />
      <button
        type="submit"
        className="submitButton clickableButton"
        disabled={!title || !body || !signedIn || !activeTags}
        onClick={(e) => submitHandler(e)}>Submit</button>
    </form>
  </div>;
}

export default PostForm;
