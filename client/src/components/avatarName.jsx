import React from 'react';
import styled from "styled-components";
import Avatar from '@material-ui/core/avatar';
import Box from '@material-ui/core/box';

const AvatarName = ({nick, src}) => {

    return (
        <Box className='user-avatar' style={Box_style} >
            <Avatar alt="user-avatar" src={src}/>
            <P>{nick}</P>
        </Box>
    );
};

export default AvatarName;

const P = styled.p`
color: darkslategrey;
padding-bottom: 2px;
`;

const Box_style = {
    display: 'flex',
    flexDirection: 'row',

};