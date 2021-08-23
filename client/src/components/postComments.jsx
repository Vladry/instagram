import React from 'react';
import styled from 'styled-components';

const PostComments = (props) => {
let {comments} = props;
if(!comments || comments.length === 0) return <p style={{fontSize: '1em', color: '#777'}}>
    никто, пока - что не оставил здесь комментарий</p>;

const commentList = comments.map( (commentObj, indx) =>
    <StyledLi  key = {indx}>
        <p>{commentObj.comment}</p>
    </StyledLi>
    )
;

    return (
        <ul>
            {commentList}
        </ul>
    );
};

export default PostComments;


const StyledLi = styled.li`
    list-style-type: '➢  ';
    margin-left: 20px;
    }
`;