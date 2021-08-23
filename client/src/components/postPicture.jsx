import React from 'react';
import styled from 'styled-components';

const PostPicture = (props) => {
    return (
            <StyledImg src={props.picture} width='450px' alt='post-picture'/>
    );
};

export default PostPicture;

const StyledImg = styled.img`
border-radius: 30px;
border: 3px solid red;
`;