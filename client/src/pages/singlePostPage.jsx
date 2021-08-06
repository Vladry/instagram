import React from 'react';
import Button from '@material-ui/core/Button';
// про кнопки:   https://material-ui.com/ru/components/buttons/#button
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import CancelIcon from '@material-ui/icons/Cancel';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PersonAddDisabledOutlinedIcon from '@material-ui/icons/PersonAddDisabledOutlined';

// управление иконками: https://material-ui.com/ru/components/icons/#font-icons
// поиск иконок:  https://material-ui.com/ru/components/material-icons/

const SinglePostPage = () => {
    return(
        <div>
            <h2>this is a page with a single post of a user</h2>
<SendOutlinedIcon/>
<MailOutlineOutlinedIcon/>
<ChatBubbleOutlineOutlinedIcon/>
<PersonOutlineOutlinedIcon/>
<GroupAddOutlinedIcon/>
<PeopleAltOutlinedIcon/>
<PersonAddOutlinedIcon/>
<PersonAddDisabledOutlinedIcon/>
            <Button variant="outlined" color="primary" onClick={() => { alert('clicked') }}>
                <FavoriteBorderOutlinedIcon/><FavoriteOutlinedIcon/>Отслеживать<CancelIcon/>
            </Button>
        </div>
    );
};

export default SinglePostPage;