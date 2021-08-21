import React from 'react';

const PostComments = (props) => {
let {comments} = props;
console.log("comments: ", comments);
if(!comments || comments.length === 0) return <p style={{fontSize: '1em', color: '#999'}}>
    никто, пока - что не оставил здесь комментарий</p>;

const commentList = comments.map( (commentObj, indx) =>
    <li  key = {indx}>
        <p>{commentObj.comment}</p>
    </li>
    )
;

    return (
        <ul>
            {commentList}
        </ul>
    );
};

export default PostComments;