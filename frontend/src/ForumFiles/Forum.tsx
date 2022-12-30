import React from 'react'
import Posts from '../features/posts/Posts'
import SignIn from './SignIn'
function Forum() {
  return (
    <div className="forumContainer">
      <SignIn/>
      <Posts/>
    </div>
  )
}

export default Forum
