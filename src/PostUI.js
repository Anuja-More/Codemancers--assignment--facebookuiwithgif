import React from 'react'

function PostUI(props) {
    return (
        <div className="postBox">
            <div className="header">
                Post {props.index+1}

            </div>
            <div className="postBody">
                <text>{props.post.postText}</text>
                {
                    props.post.gifUrl?<img style={{display:'block', marginTop:'10px'}} alt="gif" src={props.post.gifUrl}></img>:<div></div>
             }
            
            </div>
        </div>
    )
}

export default PostUI
