import React from 'react';
import Card from "./Card";

const BulkPosts = ({posts, likedPostsIdlist, clickManager}) => {

    const bulkPosts = posts.map((post) =>
        <Card key={post._id} post={post} likedPostsIdlist={likedPostsIdlist}/> );

    return (
        <div onClick={clickManager}>
            {bulkPosts}
        </div>
    );
};

export default BulkPosts;
