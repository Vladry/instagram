import React from 'react';
import styled from "styled-components";
import Avatar from '@material-ui/core/avatar';
import Box from '@material-ui/core/box';


const AvatarName = ({nick, src}) => {

    return (
        <Box className='user-avatar' style={Box_style}>
            <AvatarStyled alt="user-avatar" src={src}/>
            <P>{nick}</P>
        </Box>
    );
};


const AvatarStyled = styled(Avatar)`
width: 25px;
height: 25px
`;


export default AvatarName;

const P = styled.p`
color: darkslategrey;
padding: 0 10px 0 10px;
font-size: 12px;
line-height: 25px;
`;

const Box_style = {
    display: 'flex',
    maxWidth: "8em",
    flexDirection: 'row',
    backgroundColor: 'lightgoldenrodyellow',
    borderRadius: '4px',
    border: '1px solid lightgray',
};