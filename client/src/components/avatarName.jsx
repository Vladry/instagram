import React from 'react';
import styled from "styled-components";
import Avatar from '@material-ui/core/avatar';
import Box from '@material-ui/core/box';
import {makeStyles} from '@material-ui/core/styles';

const AvatarName = ({nick, loggedInUser = true, large = false, src, handler}) => {
// !!! кастомная стилизация material-ui компонентов делается ТОЛЬКО с помощью makeStyles()
    const useStyles = makeStyles({
        Box_style: {   //доп стилизация material-ui:  https://material-ui.com/ru/styles/basics/
            display: 'flex',
            maxWidth: "18em",
            minWidth: '8em',
            flexDirection: 'row',
            backgroundColor: 'lightgoldenrodyellow',
            borderRadius: '4px',
            border: '1px solid lightgray',

            "&:hover": {
                cursor: 'pointer'
            }
        },
        BoxStyledLoggedIn: {
            display: 'flex',
            maxWidth: "18em",
            minWidth: '10em',
            flexDirection: 'row',
            borderRadius: '4px',
            border: '1px solid lightgray',
            backgroundColor: 'lightcoral',
        }
    });
    const classes = useStyles();

    return (
        <Box
            className={loggedInUser ? classes.BoxStyledLoggedIn : classes.Box_style}
            onClick={handler}
        >
            {!large && <AvatarStyled alt="user-avatar" src={src}/>}
            {large && <AvatarLargeStyled alt="user-avatar" src={src}/>}
            <P>{nick}</P>
        </Box>
    );
};

export default AvatarName;


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
const P = styled.p`
color: darkslategrey;
margin: 0 auto;
font-size: 12px;
line-height: 25px;
`;

