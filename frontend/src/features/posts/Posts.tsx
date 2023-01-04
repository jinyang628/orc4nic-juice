import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useAppSelector } from "../../app/hooks";
import Post from './Post';
import PostForm from './PostForm';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { fetchPostsAsync, selectPosts, selectStatus, Statuses, updatePostAsync } from './postSlice';
import TagsSearch from '../search/tagsSearch';
import { RootState } from '../../app/store';

function Posts() {
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus)
  // fetch the tags from the redux store   
  const activeTags = useSelector((state: RootState) => state.activeTags);
  const dispatch = useDispatch<ThunkDispatch<{}, void, AnyAction>>();
  const [postToEdit, setPostToEdit] = useState(0);
  
  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch])

// the authentication will come here
  function toggleEditForm(post_id?:number) {
      if (postToEdit === post_id) {
          setPostToEdit(0);
      } else {
          setPostToEdit(post_id as number);
      }
  }

  function submitEdit(formData:any) {
      dispatch(updatePostAsync(formData));
      toggleEditForm();
  }

  let contents;
  //Shows Loading/Error if content not up to date
  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>
  } 
  //Shows content properly if content is up to date
  else {
      contents = <div className="card">
        <div className="card-body">
            <PostForm/>
            {/* <TagsSearch
              //need add new prop? 
              setTags={setTags}
              purpose={"search"}
            /> */}
            {posts && posts.length > 0 && posts.map(post => {
                return <div key={post.id} style={{margin:"5em"}}>
                    <Post 
                        dispatch={dispatch}
                        post={post}
                        toggleEditForm={() => toggleEditForm(post.id)}
                        postToEdit={postToEdit}
                        submitEdit={submitEdit}
                        username={post.username}
                        tags={activeTags}
                    />
                </div>
            })}
            </div>
      </div>
  }

  return <div className="postsSection">{contents}</div>
}

export default Posts;
