import React from 'react';
import Button from '@material-ui/core/Button';
// про кнопки:   https://material-ui.com/ru/components/buttons/#button
import Box from '@material-ui/core/Box';

import CancelIcon from '@material-ui/icons/Cancel';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PersonAddDisabledOutlinedIcon from '@material-ui/icons/PersonAddDisabledOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

// управление иконками: https://material-ui.com/ru/components/icons/#font-icons
// поиск иконок:  https://material-ui.com/ru/components/material-icons/

const Utils = () => {
    return (
        < Box className='footer'>
            <SendOutlinedIcon/>
            <MailOutlineOutlinedIcon/>
            <ChatBubbleOutlineOutlinedIcon/>
            <PersonOutlineOutlinedIcon/>
            <GroupAddOutlinedIcon/>
            <PeopleAltOutlinedIcon/>
            <PersonAddOutlinedIcon/>
            <PersonAddDisabledOutlinedIcon/>
            <Button variant="outlined" color="primary" onClick={() => {
                alert('clicked')
            }}>
                <FavoriteBorderIcon/><FavoriteIcon/>Отслеживать<CancelIcon/>
            </Button>
        </ Box>
    );
};

export default Utils;