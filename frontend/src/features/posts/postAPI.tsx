import tagsSlice from "../search/tagsSlice";
import { PostDeleteData, PostFormData, PostsState } from "./postSlice";

const API_URL = "http://localhost:3000";

export async function fetchPosts() {
  return fetch(`${API_URL}/posts.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      return {} as PostsState;
    });
}

export async function createPost(payload: PostFormData) {
  const post = payload.post;
  //DELETE AFTER TROUBLESHOOTING: Username correctly recorded
  return fetch(`${API_URL}/posts.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post:{
        title: post.title,
        body: post.body,
        username: post.username,
        //what if its an array?
        tags: post.tags,
      }
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      return {} as PostsState;
    });
}

export async function updatePost(payload: PostFormData) {
  const post = payload.post;
  return fetch(`${API_URL}/posts/${post.id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post:{
        title: post.title,
        body: post.body,
        username: post.username,
        //what if its an array?
        tags: post.tags,
      }
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      return {} as PostsState;
    });
}

export async function destroyPost(payload: PostDeleteData) {
  const post = payload.post;
  return fetch(`${API_URL}/posts/${post.post_id}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      return {} as PostsState;
    });
}
