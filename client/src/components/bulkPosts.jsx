import React from 'react';
import Card from "./Card";


const BulkPosts = ({allUsersPosts_, clickManager}) => {
    if (!allUsersPosts_ ||  allUsersPosts_.length === 0) return <div>loading</div>;

    const bulkPosts = allUsersPosts_.map((post) =>
        <Card key={post._id} post={post}/> );


    return (
        <div onClick={clickManager}>
            {bulkPosts}
        </div>
    );
};

export default BulkPosts;
