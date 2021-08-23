import React from 'react';
import Grid from "@material-ui/core/Grid";
import styled from 'styled-components';
import Box from "@material-ui/core/Box";

const BulkPosts = ({posts, handler}) => {

    const bulkPosts_ = posts.map((post) => {
        const {_id, picture, content, date} = post;
        return (
            <Div key={_id}>
                <StyledImg src={picture} width='80%' alt='post-picture'/>
                <P>{content}</P>
                <p>Дата: {new Date(date).toLocaleDateString()}</p>
            </Div>
        )
    });
    return (
        <div  onClick={handler}>
            {bulkPosts_}
        </div>
    );
};

export default BulkPosts;

const Div = styled.div`
margin-top: 5%;
`;
const P = styled.p`
max-width: 70%;
color: darkslategrey;
margin: 2px auto 
`;

const StyledImg = styled.img`
border-radius: 30px;
border: 1px solid darkblue;
box-shadow: 3px 3px 3px 0 rgba(8, 63, 195, 0.33);
`;
