import React from 'react';
import styled from 'styled-components';

const PostComments = (props) => {
    let {comments} = props;
    if (!comments || comments.length === 0) return <p style={{fontSize: '1em', color: '#777'}}>
        никто, пока - что не оставил здесь комментарий</p>;

    const commentList = comments.map((commentObj, indx) =>
            <StyledLi key={indx}>
                <span>{commentObj.comment}</span>
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
  &:before {
    content: '➢ ';
    position: relative;
    left: -6px;
  }
    //list-style-type: '➢  ';
`;