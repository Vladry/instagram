import React from 'react';

const PostPicture = (props) => {
    return (
        <>
            <img src={props.picture} width='450px' alt='post-picture'/>
        </>
    );
};

export default PostPicture;