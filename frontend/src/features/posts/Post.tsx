import React, { useEffect, useState } from 'react';
import ButtonGroup from './ButtonGroup';

function Post(props:any) {
    const [title, setTitle] = useState(props.post.title);
    const [body, setBody] = useState(props.post.body);
    const [username, setUsername] = useState(props.post.username);
    const [isEditing, setIsEditing] = useState(props.postToEdit === props.post.id);

    useEffect(() => {
        setIsEditing(props.postToEdit === props.post.id);
    }, [props.postToEdit, props.post.id])

    function submitHandler(e:any) {
        e.preventDefault();
        const formData = {
            post: {
                id: props.post.id,
                title: title,
                body: body,
                username: username,
            }
        }
        props.submitEdit(formData)
        resetState();
    }

    function resetState() {
        setTitle(props.post.title);
        setBody(props.post.body);
        setUsername(props.post.username);
    }

    const titleElement = <h2 className="title text-start">{props.post.title}</h2>;
    const bodyElement = <p className="card-text text-start">{props.post.body}</p>;

    const editableTitle = <input 
                            type="text" 
                            className="form-control text-start" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} />;
    const editableBody = <textarea 
                            className="form-control text-start"
                            value={body}
                            onChange={(e) => setBody(e.target.value)} />;
    const submitButton = <button
                            type="submit"
                            className="form-control"
                            onClick={(e) => submitHandler(e)}>Submit</button>;
    //all the ternary operators below is about whether the user is editing the comment or just viewing it
    return <div>
            <div className="row">
                <div className="col-8">
                    {isEditing ? editableTitle : titleElement}
                </div>
                <div className="col-4">
                    <ButtonGroup 
                        username={props.post.username}
                        post_id={props.post.id}
                        dispatch={props.dispatch}
                        toggleEditForm={props.toggleEditForm}
                        />
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    {isEditing ? editableBody : bodyElement}
                </div>
            </div>
            <div className="row">
                <p>Username: {username}</p>
            </div>
            <div className="row">
                <div className="col-2">
                    {isEditing ? submitButton : ""}
                </div>
            </div>
            <div className="row">
                Tags:
            </div>
        </div>;
}

export default Post;
