import React from 'react';
import Card from "./Card";

const BulkPosts = ({posts, handler}) => {

    const bulkPosts = posts.map((post) =>
        <Card post={post}/> );

    return (
        <div onClick={handler}>
            {bulkPosts}
        </div>
    );
};

export default BulkPosts;
