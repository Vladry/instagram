import React from 'react';
import styled from "styled-components";
import Avatar from '@material-ui/core/avatar';
import Box from '@material-ui/core/box';

const AvatarName = ({nick, loggedInUser = true, large = false, src}) => {

    return (
        <Box className='user-avatar'
             style={loggedInUser ? BoxStyledLoggedIn : Box_style}>
            {!large && <AvatarStyled alt="user-avatar" src={src}/> }
            {large && <AvatarLargeStyled alt="user-avatar" src={src}/> }
            <P>{nick}</P>
        </Box>
    );
};


const AvatarStyled = styled(Avatar)`
width: 25px;
height: 25px;
margin: 2px;
border: 1px solid darkgreen;
`;

const AvatarLargeStyled = styled(Avatar)`
width: 35px;
height: 35px;
margin: 3px;
border: 3px solid darkred;
`;


export default AvatarName;

const P = styled.p`
color: darkslategrey;
margin: 0 auto;
font-size: 12px;
line-height: 25px;
`;

const Box_style = {
    display: 'flex',
    maxWidth: "18em",
    minWidth: '8em',
    flexDirection: 'row',
    backgroundColor: 'lightgoldenrodyellow',
    borderRadius: '4px',
    border: '1px solid lightgray',
};

const BoxStyledLoggedIn = {
    display: 'flex',
    maxWidth: "18em",
    minWidth: '10em',
    flexDirection: 'row',
    borderRadius: '4px',
    border: '1px solid lightgray',
    backgroundColor: 'lightcoral'
};
