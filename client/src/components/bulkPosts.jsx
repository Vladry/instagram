import React from 'react';
import Card from "./Card";


const BulkPosts = ({allUsersPosts_, clickManager, scrollRef}) => {
    if (!allUsersPosts_ || allUsersPosts_.length === 0) return <div>loading</div>;
    const lastInd = allUsersPosts_.length - 1;
    const bulkPosts = allUsersPosts_.map((post, i) =>
        <Card key={post._id} post={post} scrollRef={(lastInd === i)? scrollRef : null}/>
    );


    return (
        <div onClick={clickManager}>
            {bulkPosts}
        </div>
    );
};

export default BulkPosts;
