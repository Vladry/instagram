import React from 'react';
import Card from "./Card";


const BulkPosts = ({allUsersPosts, likedPostsIdlist, clickManager}) => {

    const bulkPosts = allUsersPosts.map((post) =>
        <Card key={post._id} post={post} likedPostsIdlist={likedPostsIdlist}/> );

    return (
        <div onClick={clickManager}>
            {bulkPosts}
        </div>
    );
};

export default BulkPosts;
