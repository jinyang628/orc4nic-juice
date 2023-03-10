import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useAppSelector } from "../../app/hooks";
import Post from './Post';
import PostForm from './PostForm';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { fetchPostsAsync, selectPosts, selectStatus, Statuses, updatePostAsync } from './postSlice';
import TagsSearch from '../search/tagsSearch';
import { RootState } from '../../app/store';
import Select, { MultiValue } from 'react-select';


type Option = {
  //string that represents the human-readable label for the option
  //used to display the option to the user
  label: string; 
  //string that represents the underlying value for the option 
  //used to identify the option
  value: string;
};

function Posts() {
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus)
  // fetch the tags from the redux store   
  const activeTags = useSelector((state: RootState) => state.activeTags);
  const dispatch = useDispatch<ThunkDispatch<{}, void, AnyAction>>();
  const [postToEdit, setPostToEdit] = useState(0);
  
  //static list, can change to dynamic later
  const tagsList = ['Bitter Gourd', 'Recipe', 'Orange', 'Apple'];
  //each tag is transformed into an 'Option' object with a 'label' and 'value' property
  const options = tagsList.map((tag, index) => ({ value: tag, label: tag }));

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

  //this is for the Filter tags 
  function handleSearchTagsChange(newOptionsArray: MultiValue<Option>){
    const searchOptionsArray = Array.from(newOptionsArray.values());
    setSelectedSearchOptions(searchOptionsArray);
  }
  
  const [selectedSearchOptions, setSelectedSearchOptions] = useState<Option[]>(new Array<Option>());
  const selectedSearchTags = selectedSearchOptions.map(option => option.value);
  
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
            <Select
              className={"filterTagsSearchBar"} 
              placeholder={"Filter posts"}
              options={options}
              onChange={handleSearchTagsChange}
              value={selectedSearchOptions}
              isMulti
            />
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
                        selectedSearchTags={selectedSearchTags}
                    />
                </div>
            })}
            </div>
      </div>
  }

  return <div className="postsSection">{contents}</div>
}

export default Posts;
